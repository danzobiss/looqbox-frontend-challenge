import React, { useState, useContext, createContext } from 'react';
import PokemonData from '../@types/PokemonData';

export const PokemonDetailsContext = createContext({});

interface Props {
    children: any;
}

export const PokemonDetailsProvider:React.FC<Props> = ({children}) => {
    const [pokemonDetails, setPokemonDetails] = useState<PokemonData[]>([]);

    return(
        <PokemonDetailsContext.Provider value={{pokemonDetails, setPokemonDetails}}>
            {children}
        </PokemonDetailsContext.Provider>
    );
}

export const usePokemonDetails = () => {
    const context = useContext(PokemonDetailsContext);
    const { pokemonDetails, setPokemonDetails}: any = context;

    return { pokemonDetails, setPokemonDetails};
}

