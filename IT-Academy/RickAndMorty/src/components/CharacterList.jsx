import React, { useState, useEffect} from "react";
import axios from 'axios';

import CharacterCard from "./CharacterCard";

const CharacterList = ()=>{

    const[characters, setCharacters]= useState([]);


    const fetchCharacters= async () => {
        try {
            const response = await axios.get('https://rickandmortyapi.com/api/character');
            setCharacters(response.data.results);
        } catch (error) {
            console.error('Error fetching characters:', error)
        }
    }


    useEffect( ()=>{

        fetchCharacters();

    },[]);


    return ( <div className="character_list">
                {characters.map ((character) => (
                    <CharacterCard key={character.id} character={character}/>
                ))}
            </div>
          )

};

export default CharacterList;