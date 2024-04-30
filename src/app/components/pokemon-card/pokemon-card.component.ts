import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ELocalStorage } from 'app/enum/ELocalStorage.enum';
import { IListPokemon } from 'app/interface/IListPokemon.interface';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {
  @Input({ required: true }) public pokemonInfo: IListPokemon | null = null;
  @Output() pokemonInfoChange: EventEmitter<IListPokemon | null> =
    new EventEmitter<IListPokemon | null>();

  #getLocalStorage() {
    return JSON.parse(localStorage.getItem(ELocalStorage.POKEDEX_DATA) || '[]');
  }
  #updateLocalStorage(newData: Array<number>) {
    localStorage.setItem(ELocalStorage.POKEDEX_DATA, JSON.stringify(newData));
  }

  public AddToTeam() {
    this.pokemonInfo!.selected = !(this.pokemonInfo?.selected ?? true);
    this.pokemonInfoChange.emit(this.pokemonInfo);
    if (this.pokemonInfo!.selected)
      this.#updateLocalStorage([
        ...this.#getLocalStorage(),
        this.pokemonInfo?.id,
      ]);
    else
      this.#updateLocalStorage(
        [...this.#getLocalStorage()].filter(
          (fil) => fil !== this.pokemonInfo?.id
        )
      );
  }
}
