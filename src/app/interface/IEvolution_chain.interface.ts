export interface IEvolutionChain {
  evolves_to: Array<IEvolutionChain>;
  is_baby: boolean;
  species: {
    name: string;
    url: string;
  };
}
