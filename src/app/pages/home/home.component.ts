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
import { PokemonTypes } from 'app/enum/PokemonTypes.enum';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PokemonListComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  #pokeApiService = inject(PokeapiService);
  public activeSearch = signal(false);
  public getPokemonList = this.#pokeApiService.getPokemonList;
  public pokemonTypes = Object.values(PokemonTypes);

  ngOnInit(): void {
    this.#pokeApiService.clearPokemonList();
    this.#pokeApiService.listPokemon$().subscribe();
  }

  public showMorePokemon() {
    this.#pokeApiService.listPokemon$().subscribe();
  }

  public searchPokemons(form: NgForm) {
    console.log(form.value);
    let search = form.value.SearchInput;
    let type = form.value.PokemonTypes !== '' ? form.value.PokemonTypes : null;
    if (search !== '') {
      const num = parseInt(search);
      if (!isNaN(num) && Number.isInteger(num))
        this.#pokeApiService.listPokemonFilter$(num, type).subscribe();
      else this.#pokeApiService.listPokemonFilter$(search, type).subscribe();
    } else this.#pokeApiService.listPokemonFilter$(null, type).subscribe();

    this.activeSearch.set(true);
  }

  public clearSearch(event: Event) {
    event.preventDefault();
    if (this.activeSearch()) {
      this.#pokeApiService.clearPokemonList();
      this.#pokeApiService.listPokemon$().subscribe();
      this.activeSearch.set(false);
    }
  }
}
