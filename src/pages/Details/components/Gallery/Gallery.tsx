import React from 'react';

import { Container, Photos } from './styles';

interface Props {
    sprites: {
        back_default: string;
        back_female: string;
        back_shiny: string;
        back_shiny_female: string;
        front_default: string;
        front_female: string;
        front_shiny: string;
        front_shiny_female: string;
        other: {
            dream_world: {
                front_default: string;
                front_female: string;
            };
            home: {
                front_default: string;
                front_female: string;
                front_shiny: string;
                front_shiny_female: string;
            }
            "official-artwork": {
                front_default: string;
            };
        };
    };
}

const Gallery: React.FC<Props> = ({sprites}) => {

    const images: Array<Array<string>> = []

    function convertToArray(object: Object, name: string): Array<Array<string>> {
        let array = Object.entries(object)
        array.map(element => {
            if (element[1]) {
                if(typeof element[1] != "string") {
                    const returnedArray = convertToArray(element[1], name + ": " + element[0])
                    element[1] = returnedArray
                } else {
                    element[0] = name + "_" + element[0]
                    images.push(element)
                }
            }
        })

        return array;
    }

    convertToArray(sprites, "");
    console.log(images);


    return (
        <Container>
            <h2>Gallery</h2>

            <Photos>

                {images.map(image => (
                    <img
                        key={image[0]}
                        src={image[1]}
                        alt={image[0]}
                        title={image[0].replaceAll("_", " ").substring(1).trim()}
                    />
                ))}

            </Photos>
        </Container>
    );
}

export default Gallery;