import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loading from '../../../../elements/Loading/Loading';
import pokeAPI from '../../../../services/api';
import logo from '../../../../assets/pokedex.png';

import { Container, Logo, Form, Input, SearchButton, SearchIcon } from './styles';

interface Props{
    set: React.Dispatch<React.SetStateAction<string>>,
    setShowing: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchInput:React.FC<Props> = ({set, setShowing}) => {

    const [input, setInput] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    function searchPokemon(event: any){
        event.preventDefault();

        const value = sanitizer(input);

        setLoading(true);
        pokeAPI.get(`pokemon/${value}`).then(res => {
            sessionStorage.setItem("scrollPosition", window.scrollY.toString())
            navigate(`details/${value}`);
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Pokémon not found!',
            });
        }).finally(() => {
            setLoading(false);
        });
    }

    function sanitizer(text: string):string {
        text = text.trim();
        text = text.replace(/[^a-zA-Z0-9 ]/g, "");
        
        while (text.charAt(0) == '0') {
            text = text.substring(1);
        }

        text = text.replaceAll(" ", "-");

        return text;
    }

    return(
        <>
            {loading ? <Loading /> : <React.Fragment />}
            <Container>
                <Logo src={logo} />
                <Form onSubmit={searchPokemon}>
                    <Input 
                        type="search" 
                        required 
                        placeholder='Enter a pokemon name or its id'
                        value={input} 
                        onChange={(e) => {
                            setInput(e.target.value);
                            set(e.target.value);
                            setShowing(false);
                            sessionStorage.setItem("scrollPosition", window.scrollY.toString());
                        }} 
                    />
                    <SearchButton type='submit'><SearchIcon /></SearchButton>
                </Form>
            </Container>
        </>
    );
}

export default SearchInput;