import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { PokeapiService } from 'app/services/pokeapi.service';
import { PokemonCardComponent } from '@components/pokemon-card/pokemon-card.component';
import { IListPokemon } from 'app/interface/IListPokemon.interface';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [PokemonCardComponent, JsonPipe],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent implements OnInit {
  #pokeApiService = inject(PokeapiService);
  public activeSearch = signal(false);
  @ViewChild('search') public inputSearch!: ElementRef;
  public getPokemonList = this.#pokeApiService.getPokemonList;

  ngOnInit(): void {
    this.#pokeApiService.listPokemon$().subscribe();
  }

  public showMorePokemon() {
    this.#pokeApiService.listPokemon$().subscribe();
  }

  public searchPokemons(search: string) {
    if (search !== '') {
      const num = parseInt(search);
      if (!isNaN(num) && Number.isInteger(num))
        this.#pokeApiService.listPokemonFilter$(num).subscribe();
      else this.#pokeApiService.listPokemonFilter$(search).subscribe();
      this.activeSearch.set(true);
    }
  }
  public clearSearch() {
    if (this.activeSearch()) {
      this.inputSearch.nativeElement.value = '';
      this.#pokeApiService.clearPokemonList();
      this.#pokeApiService.listPokemon$().subscribe();
      this.activeSearch.set(false);
    }
  }

  public setPokemonSelected(newPokemon: IListPokemon | null) {
    this.#pokeApiService.pathPokemonSelected(newPokemon);
  }
}
