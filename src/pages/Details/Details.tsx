import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import PokemonData from '../../@types/PokemonData';
import { usePokemonDetails } from "../../providers/PokemonDetailsProvider";

import pokeAPI from '../../services/api';

import Loading from '../../elements/Loading/Loading';
import MainContent from './components/MainContent/MainContent';
import Stats from './components/Stats/Stats';

import { 
    Container,
    Main,
    Section
} from './styles';
import Gallery from './components/Gallery/Gallery';

const Details:React.FC = () => {
    const {id} = useParams<string>();

    const [details, setDetails] = useState<PokemonData>();
    const [loading, setLoading] = useState(true);
    
    const { pokemonDetails, setPokemonDetails} = usePokemonDetails();

    const navigate = useNavigate();

    useEffect(() => {
        const alreadyHas = (pokemonDetails as PokemonData[]).find(info => info.id == parseInt(id as string));
        if (alreadyHas == undefined) {
            pokeAPI.get(`pokemon/${id}`).then(({data}) => {
                setDetails(data);
                pokemonDetails.push(data);
                setPokemonDetails(pokemonDetails);
            }).catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Pokémon not found!',
                }).then(() => {
                    navigate(-1)
                });
            }).finally(() => {
                setLoading(false);
            });
        } else {
            setDetails(alreadyHas);
            setLoading(false);
        }
    }, []);

    return(
        <>
            {loading ? <Loading /> : <React.Fragment/>}
            <Container>
                {
                details == undefined ? <React.Fragment/> : 
                    <>
                        <Main className={`background-${details.types[0].type.name}`}>
                            <MainContent 
                                id={details.id} 
                                name={details.name}
                                types={details.types}
                                photo={details.sprites.other['official-artwork'].front_default}
                                height={details.height}
                                weight={details.weight}
                                base_xp={details.base_experience}
                                abilities={details.abilities}
                            />
                        </Main>

                        <Section>
                            
                            <Stats stats={details!.stats}/>

                            <Gallery 
                                sprites={details!.sprites}
                            />
                        </Section>
                    </>
                }
            </Container>
        </>
    );
}

export default Details;