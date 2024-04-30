import { JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { PokeapiService } from 'app/services/pokeapi.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #pokeApiService = inject(PokeapiService);

  public getPokemonDetails = this.#pokeApiService.getPokemonDetails;

  ngOnInit(): void {
    this.#pokeApiService.getPokemonDetails$(this.#route.snapshot.params['id']).subscribe(); 
  }

  getPokemonFlavorText(): string {
    const flavorTextEntries = this.getPokemonDetails()?.species?.specieDetail?.flavor_text_entries;
    return flavorTextEntries?.filter(f=> f.language.name == 'en').pop()?.flavor_text ?? ''; 
}

  public nextPokemon(){
    let newId = parseInt(this.#route.snapshot.params['id']) + 1;
    this.#router.navigate(['/pokemon', newId]); 
    this.#pokeApiService.getPokemonDetails$(newId).subscribe(); 

  }

  public previousPokemon(){
    let newId = parseInt(this.#route.snapshot.params['id']) - 1;
    this.#router.navigate(['/pokemon', parseInt(this.#route.snapshot.params['id']) - 1]); 
    this.#pokeApiService.getPokemonDetails$(newId).subscribe(); 
  }
}
