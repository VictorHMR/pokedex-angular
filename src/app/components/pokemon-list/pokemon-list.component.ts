import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  inject,
  input,
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
export class PokemonListComponent {
  @Input({ required: true }) public PokemonList: Array<IListPokemon> | null =
    null;
}
