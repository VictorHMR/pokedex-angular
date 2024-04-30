import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { ELocalStorage } from 'app/enum/ELocalStorage.enum';
import { IListPokemon } from 'app/interface/IListPokemon.interface';
import { IPokemonDetails } from 'app/interface/IPokemonDetails.interface';
import { environment } from 'environments/environment';
import {
  Observable,
  forkJoin,
  from,
  map,
  mergeMap,
  shareReplay,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeapiService {
  #http = inject(HttpClient);
  #url = signal(environment.APIs.PokeApi);
  #NextPage = signal(null);

  #setPokemonList = signal<Array<IListPokemon> | null>(null);
  get getPokemonList() {
    return this.#setPokemonList.asReadonly();
  }
  set #setPokemonToList(newPoke: IListPokemon) {
    if (newPoke.id <= 9999) {
      const currentList = this.getPokemonList() || [];
      const mappedRes: IListPokemon = {
        id: newPoke.id,
        name: newPoke.name.charAt(0).toUpperCase() + newPoke.name.slice(1),
        order: newPoke.order,
        types: newPoke.types,
        image: this.setPokemonImage(newPoke.id),
        selected: Array.from(
          JSON.parse(localStorage.getItem(ELocalStorage.POKEDEX_DATA) || '[]')
        ).find((f) => f == newPoke.id)
          ? true
          : false,
      };
      const updatedList = [...currentList, mappedRes].sort(
        (a, b) => a.id - b.id
      );
      this.#setPokemonList.set(updatedList);
    }
  }
  public listPokemon$(): Observable<IListPokemon> {
    return this.#http
      .get<any>(this.#NextPage() ?? `${this.#url()}pokemon`)
      .pipe(
        map((value: any) => {
          this.#NextPage.set(value.next);
          return from(value.results).pipe(
            mergeMap((v: any) => this.#http.get<IListPokemon>(v.url))
          );
        }),
        mergeMap((value) => value),
        tap((res) => (this.#setPokemonToList = res))
      );
  }
  public listPokemonFilter$(search: string | number): Observable<IListPokemon> {
    this.#setPokemonList.set(null);
    this.#NextPage.set(null);

    return this.#http.get<any>(`${this.#url()}pokemon?limit=9999`).pipe(
      map((value: any) => {
        value.results = value.results.filter((fil: any) => {
          if (typeof search == 'string')
            return fil.name.includes(search.toLowerCase());
          else return fil.url.includes(search);
        });
        return from(value.results).pipe(
          mergeMap((v: any) => this.#http.get<IListPokemon>(v.url))
        );
      }),
      mergeMap((value) => value),
      tap((res) => (this.#setPokemonToList = res))
    );
  }

  #setPokemonDetails = signal<IPokemonDetails | null>(null);
  get getPokemonDetails() {
    return this.#setPokemonDetails.asReadonly();
  }
  public getPokemonDetails$(id: number): Observable<IPokemonDetails> {
    this.#setPokemonDetails.set(null);
    return this.#http.get<IPokemonDetails>(`${this.#url()}pokemon/${id}`).pipe(
      tap((res) => {
        const mappedRes: IPokemonDetails = {
          id: res.id,
          name: res.name.charAt(0).toUpperCase() + res.name.slice(1),
          order: res.order,
          height: res.height / 10,
          weight: res.weight / 10,
          types: res.types,
          image: this.setPokemonImage(res.id),
          sprites: res.sprites,
          stats: res.stats,
          species: res.species,
        };
        this.#http
          .get<{
            flavor_text_entries: [
              { flavor_text: string; language: { name: string } }
            ];
            evolution_chan: { url: string };
          }>(res.species?.url)
          .pipe(
            tap((res) => {
              mappedRes.species.specieDetail = res;
            })
          )
          .subscribe();
        this.#setPokemonDetails.set(mappedRes);
      })
    );
  }

  public setPokemonImage(str: string | number, size = 3): string {
    let s = String(str);
    while (s.length < (size || 2)) {
      s = '0' + s;
    }
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${s}.png`;
  }
  public clearPokemonList() {
    this.#setPokemonList.set(null);
  }
  public pathPokemonSelected(newValue: IListPokemon | null) {
    this.#setPokemonList.update((oldValues: Array<IListPokemon> | null) => {
      if (oldValues) {
        oldValues.filter((fil) => {
          if (fil.id == newValue?.id) {
            fil.selected = newValue?.selected;
          }
          return fil;
        });
      }
      return oldValues;
    });
  }
}
