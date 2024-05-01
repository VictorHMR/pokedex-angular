import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';
import { PokeapiService } from 'app/services/pokeapi.service';
import { IListPokemon } from 'app/interface/IListPokemon.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PokemonListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  #pokeApiService = inject(PokeapiService);
  public activeSearch = signal(false);
  @ViewChild('search') public inputSearch!: ElementRef;
  public getPokemonList = this.#pokeApiService.getPokemonList;

  ngOnInit(): void {
    this.#pokeApiService.clearPokemonList();
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
}
