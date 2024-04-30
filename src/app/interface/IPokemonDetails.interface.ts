export interface IPokemonDetails{
    id: number;
    name: string;
    order: number;
    height: number;
    weight: number;
    types: Array<{ 
        slot: number; 
        type?: { 
            name: string; 
            url: string 
        } 
    }>;
    image: string;
    sprites: { 
        front_default: string, 
        back_default: string,  
        back_female: string,
        back_shiny:string,  
        back_shiny_female:string,
        front_female:string, 
        front_shiny: string,
        front_shiny_female: string
    };
    stats: Array<{
        'base-stat': number,
        effort: number ,
        stat:{
            name:string;
        }
    }>,
    species: {
        name: string,
        url: string,
        specieDetail?:{
            flavor_text_entries: [{
                flavor_text: string,
                language: {
                    name: string
                }
            }],
            evolution_chan: {
                url: string
            },
        }
    },
}