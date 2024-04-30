export interface IListPokemon {
  id: number;
  name: string;
  order: number;
  types: Array<{ slot: number; type?: { name: string; url: string } }>;
  image: string;
  selected: boolean;
}
