import React from 'react';
import { Link } from 'react-router-dom';

import Type from '../../../../elements/Type/Type';

import {
    ReturnIcon,
    Types,
    PokemonPhoto,
    BasicCharacteristics,
    HeightIcon,
    WeightIcon,
    StarsIcon,
    Abilities,
    Box
} from './styles';

interface Props {
    id: number;
    name: string;
    types: [
        {
            type: {
                name: string;
            };
        }
    ];
    photo: string;
    height: number;
    weight: number;
    base_xp: number;
    abilities: [
        {
            ability: {
                name: string;
            };
        }
    ];
}

const MainContent:React.FC<Props> = ({id, name, types, photo, height, weight, base_xp, abilities}) => {
    return(
        <>
            <Link to={"/"}><ReturnIcon /></Link>
            <br />
            <span>#{String(id).padStart(3, '0')}</span>
            <h1>{name}</h1>
            <Types>
                {types?.map(type => (
                    <Type key={type.type.name} type={type.type.name}/>
                ))}
            </Types>

            <PokemonPhoto src={photo} alt={name}/>

            <BasicCharacteristics>
                <Box><p><HeightIcon />{((height as number) * 0.1).toFixed(1)}m</p></Box>
                <Box><p><WeightIcon />{((weight as number) * 0.1).toFixed(1)}kg</p></Box>
                <Box><p><StarsIcon />{base_xp}xp</p></Box>
            </BasicCharacteristics>

            <Abilities>
                <Box>
                    <h2>Abilities:</h2>
                    <ul>
                        {abilities?.map(({ability}) => (
                            <li key={ability.name}>{ability.name}</li>
                        ))}
                    </ul>
                </Box>
            </Abilities>
        </>
    );
}

export default MainContent;