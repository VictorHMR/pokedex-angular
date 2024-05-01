import { Component, OnInit, inject } from '@angular/core';
import { PokemonListComponent } from '@components/pokemon-list/pokemon-list.component';
import { ELocalStorage } from 'app/enum/ELocalStorage.enum';
import { PokeapiService } from 'app/services/pokeapi.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [PokemonListComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  #pokeApiService = inject(PokeapiService);

  public getPokemonFavoriteList = this.#pokeApiService.getPokemonListFavorite;

  ngOnInit(): void {
    this.#pokeApiService
      .listPokemonFavorited$(
        JSON.parse(localStorage.getItem(ELocalStorage.FAVORITES) || '[]')
      )
      .subscribe();
  }

  public updateList() {
    this.#pokeApiService
      .listPokemonFavorited$(
        JSON.parse(localStorage.getItem(ELocalStorage.FAVORITES) || '[]')
      )
      .subscribe();
  }
}
