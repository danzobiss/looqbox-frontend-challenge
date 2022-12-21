import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { usePokemonDetails } from "../../../../providers/PokemonDetailsProvider";

import pokeAPI from "../../../../services/api";

import PokemonData from "../../../../@types/PokemonData";
import Type from "../../../../elements/Type/Type";
import gif from '../../../../assets/loading.gif';

import { Container, PokemonPhoto, Types } from './styles';

interface Props {
    url: string;
}

const Card: React.FC<Props> = ({url}) =>{
    const [details, setDetails] = useState<PokemonData>();

    const { pokemonDetails, setPokemonDetails} = usePokemonDetails();

    const id = url.substring(34).replace("/", "");
    
    useEffect(() => {
        const alreadyHas = (pokemonDetails as PokemonData[]).find(info => info.id == parseInt(id));
        if (alreadyHas == undefined) {
            pokeAPI.get(`pokemon/${id}`).then(({data}) => {
                setDetails(data);
                pokemonDetails.push(data);
                setPokemonDetails(pokemonDetails);
            }).catch(err => {
                console.error(err);
            }).finally(() => {
            });
        } else {
            setDetails(alreadyHas)
        }
    }, []);

    return(
        <Container>
            {
                details ? 

                <Link to={`/details/${details.id}`}>
                    <p>#{String(details.id).padStart(3, '0')}</p>
                    <PokemonPhoto 
                        src={details ? details.sprites.other["official-artwork"].front_default : gif} 
                        alt={details.name}
                    />
                    <h2>{details.name}</h2>
                    <Types>
                        {details.types.map(type => (
                            <Type key={type.type.name} type={type.type.name}/>
                        ))}
                    </Types>
                </Link> 
                    
                : 

                <Link to={"/"}>
                    <PokemonPhoto 
                        src={gif}
                        alt="loading"
                    />
                </Link>
            }
        </Container>
    );
}

export default Card;