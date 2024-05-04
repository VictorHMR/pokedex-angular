import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { IEvolutionChain } from 'app/interface/IEvolution_chain.interface';
import { PokeapiService } from 'app/services/pokeapi.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #pokeApiService = inject(PokeapiService);

  public getPokemonDetails = this.#pokeApiService.getPokemonDetails;

  ngOnInit(): void {
    this.#pokeApiService
      .getPokemonDetails$(this.#route.snapshot.params['id'])
      .subscribe();
  }
  public getPokemonType(slot: number) {
    if (slot == 2 && (this.getPokemonDetails()?.types?.length ?? 1) < 2)
      slot = 1;
    return this.getPokemonDetails()
      ?.types.filter((res) => res.slot == slot)
      .shift()?.type?.name;
  }
  public GetEvolutionChain() {
    console.log(
      this.getPokemonDetails()?.species?.specieDetail?.evolution_chain?.details
    );
  }
  public AddToFavorites() {
    this.#pokeApiService.pathPokemonFavorited(this.getPokemonDetails());
  }
}
