import { Component } from '@angular/core';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PokemonListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
