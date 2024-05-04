import { IEvolutionChain } from './IEvolution_chain.interface';

export interface IPokemonDetails {
  id: number;
  name: string;
  favorited: boolean;
  order: number;
  height: number;
  weight: number;
  types: Array<{
    slot: number;
    type?: {
      name: string;
      url: string;
    };
  }>;
  abilities: Array<{
    ability: { name: string; url: string };
    is_hidden: boolean;
    slot: number;
  }>;
  image: string;
  sprites: {
    front_default: string;
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
  };
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
    };
  }>;
  species: {
    name: string;
    url: string;
    specieDetail?: {
      genera: string;
      flavor_text_entrie: string;
      evolution_chain?: {
        url: string;
        details?: IEvolutionChain | null;
      };
    };
  };
}
