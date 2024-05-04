import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ELocalStorage } from 'app/enum/ELocalStorage.enum';
import { IListPokemon } from 'app/interface/IListPokemon.interface';
import { PokeapiService } from 'app/services/pokeapi.service';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {
  @Input({ required: true }) public pokemonInfo: IListPokemon | null = null;
  #pokeApiService = inject(PokeapiService);

  public AddToFavorites() {
    this.#pokeApiService.pathPokemonFavorited(this.pokemonInfo);
  }
}
