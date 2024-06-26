import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { ELocalStorage } from 'app/enum/ELocalStorage.enum';
import { IEvolutionChain } from 'app/interface/IEvolution_chain.interface';
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
        favorited: Array.from(
          JSON.parse(localStorage.getItem(ELocalStorage.FAVORITES) || '[]')
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
  public listPokemonFilter$(
    search: string | number | null,
    type?: string | null
  ): Observable<IListPokemon> {
    this.#setPokemonList.set(null);
    this.#NextPage.set(null);

    return this.#http
      .get<any>(
        `${this.#url()}${type == null ? 'pokemon?limit=9999' : 'type/' + type}`
      )
      .pipe(
        map((value: any) => {
          if (type == null) {
            value.results = value.results.filter((fil: any) => {
              if (typeof search == 'string')
                return fil.name.includes(search.toLowerCase());
              else return fil.url.includes(search);
            });
            return from(value.results).pipe(
              mergeMap((v: any) => this.#http.get<IListPokemon>(v.url))
            );
          } else {
            value.pokemon = value.pokemon.filter((fil: any) => {
              if (typeof search == 'string')
                return fil.pokemon.name.includes(search.toLowerCase());
              else if (typeof search == 'number')
                return fil.pokemon.url.includes(search);
              else return fil;
            });
            return from(value.pokemon).pipe(
              mergeMap((v: any) => this.#http.get<IListPokemon>(v.pokemon.url))
            );
          }
        }),
        mergeMap((value) => value),
        tap((res) => (this.#setPokemonToList = res))
      );
  }

  #setPokemonListFavorite = signal<Array<IListPokemon> | null>(null);
  get getPokemonListFavorite() {
    return this.#setPokemonListFavorite.asReadonly();
  }
  public listPokemonFavorited$(
    numbers: Array<number>
  ): Observable<Array<IListPokemon>> {
    this.#setPokemonListFavorite.set(null);
    const requests = numbers.map((number) =>
      this.#http
        .get<IListPokemon>(`https://pokeapi.co/api/v2/pokemon/${number}`)
        .pipe(
          tap((res) => {
            if (res.id <= 9999) {
              const currentList = this.getPokemonListFavorite() || [];
              const mappedRes: IListPokemon = {
                id: res.id,
                name: res.name.charAt(0).toUpperCase() + res.name.slice(1),
                order: res.order,
                types: res.types,
                image: this.setPokemonImage(res.id),
                favorited: Array.from(
                  JSON.parse(
                    localStorage.getItem(ELocalStorage.FAVORITES) || '[]'
                  )
                ).find((f) => f == res.id)
                  ? true
                  : false,
              };
              const updatedList = [...currentList, mappedRes].sort(
                (a, b) => a.id - b.id
              );
              this.#setPokemonListFavorite.set(updatedList);
            }
          })
        )
    );
    return forkJoin(requests);
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
          favorited: Array.from(
            JSON.parse(localStorage.getItem(ELocalStorage.FAVORITES) || '[]')
          ).find((f) => f == id)
            ? true
            : false,
          order: res.order,
          height: res.height / 10,
          weight: res.weight / 10,
          abilities: res.abilities,
          types: res.types,
          image: this.setPokemonImage(res.id),
          sprites: res.sprites,
          stats: res.stats,
          species: res.species,
        };
        this.#http
          .get<any>(res.species?.url)
          .pipe(
            tap((res) => {
              mappedRes.species.specieDetail = {
                genera: res.genera
                  .filter((f: any) => f.language.name == 'en')
                  .pop().genus,
                flavor_text_entrie: res.flavor_text_entries
                  .filter((f: any) => f.language.name == 'en')
                  .pop().flavor_text,
              };
              this.#getEvolutionchain(res.evolution_chain.url).subscribe({
                next: (next) => {
                  if (mappedRes.species.specieDetail) {
                    mappedRes.species.specieDetail.evolution_chain = {
                      url: res.evolution_chain.url,
                      details: next,
                    };
                  }
                },
              });
            })
          )
          .subscribe();
        this.#setPokemonDetails.set(mappedRes);
      })
    );
  }
  #getEvolutionchain(url: string): Observable<IEvolutionChain> {
    return this.#http.get<any>(url).pipe(
      map((res) => ({
        evolves_to: res.chain.evolves_to,
        is_baby: res.chain.is_baby,
        species: res.chain.species,
      }))
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
    this.#NextPage.set(null);
    this.#setPokemonList.set(null);
  }

  #getLocalStorage() {
    return JSON.parse(localStorage.getItem(ELocalStorage.FAVORITES) || '[]');
  }
  #updateLocalStorage(newData: Array<number>) {
    localStorage.setItem(ELocalStorage.FAVORITES, JSON.stringify(newData));
  }
  public pathPokemonFavorited(newValue: IListPokemon | null) {
    this.#setPokemonList.update((oldValues: Array<IListPokemon> | null) => {
      if (oldValues) {
        oldValues.filter((fil) => {
          if (fil.id == newValue?.id) {
            fil.favorited = newValue?.favorited;
          }
          return fil;
        });
      }
      return oldValues;
    });
    this.#setPokemonListFavorite.update(
      (oldValues: Array<IListPokemon> | null) => {
        if (oldValues)
          return oldValues.filter((fil) => fil.id !== newValue?.id);
        else return oldValues;
      }
    );
    newValue!.favorited = !(newValue?.favorited ?? true);
    if (newValue!.favorited)
      this.#updateLocalStorage([...this.#getLocalStorage(), newValue?.id]);
    else
      this.#updateLocalStorage(
        [...this.#getLocalStorage()].filter((fil) => fil !== newValue?.id)
      );
  }
}
