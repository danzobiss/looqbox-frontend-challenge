import React, { useState, useEffect } from "react";
import PokemonListData from "../../@types/PokemonListData";
import Loading from "../../elements/Loading/Loading";
import { usePokemons } from "../../providers/PokemonListProvider";
import pokeAPI from "../../services/api";
import Card from "./components/Card/Card";
import SearchInput from "./components/SearchInput/SearchInput";

import { Container, PokemonList, NotFound, Button } from './styles';

const Home:React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [inputText, setInputText] = useState<string>("");
    const [showing, setShowing] = useState<boolean>(false);

    const { pokemons, setPokemons, offset, setOffset } = usePokemons();


    useEffect(() => {
        if(pokemons.length === 0) {
            setLoading(true);
            pokeAPI.get(`/pokemon/?offset=${offset}`).then(({data}) => {
                let alreadyPokemons = pokemons.concat(data.results);
                setPokemons(alreadyPokemons);
                setOffset(offset + 20);
            }).catch((err) => {
                console.log(err.message);
            }).finally(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    function handleClick() {
        sessionStorage.setItem("scrollPosition", window.scrollY.toString())
        setOffset(offset + 20);
        if(offset == 0) {
            console.log("cachorro");
            setOffset(offset + 40);
        }
        setLoading(true);
        pokeAPI.get(`/pokemon/?offset=${offset}`).then(({data}) => {
            let alreadyPokemons = pokemons.concat(data.results);
            setPokemons(alreadyPokemons);
        }).catch((err) => {
            console.log(err.message);
        }).finally(() => {
            setLoading(false);
        });
    }

    let scroll = sessionStorage.getItem('scrollPosition');

    return(
        <>
            {loading ? <Loading /> : <React.Fragment/>}
            <Container>
                <SearchInput set={setInputText} setShowing={setShowing}/>
                <PokemonList>
                    {
                        pokemons.map((pokemon: PokemonListData) => {
                            if (pokemon) {
                                if (inputText === "") {
                                    if(showing === false) setShowing(true);
                                    return(
                                        <Card key={pokemon.name} url={pokemon.url}/>
                                    )
                                } else {
                                    if (pokemon.name.includes(inputText.toLowerCase()) || pokemon.url.substring(34).replace("/", "").includes(inputText.toLowerCase())) {
                                        if(showing === false) setShowing(true);
                                        return(
                                            <Card key={pokemon.name} url={pokemon.url}/>
                                        )
                                    }
                                }
                            }
                        })
                    }
                </PokemonList>
                {!showing ? <NotFound>No loaded pokémons with this name or id. Press "Enter" to try search anyway.</NotFound> : <React.Fragment />}
                <Button onClick={() => handleClick()}>Show More Pokémons</Button>
            </Container>
            {inputText === "" ? window.scrollTo(0, scroll ? parseInt(scroll) : 0) : window.scrollTo(0, 0)}
        </>
    )
}

export default Home;