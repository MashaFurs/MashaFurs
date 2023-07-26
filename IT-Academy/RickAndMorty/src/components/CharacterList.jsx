import React, { useState, useEffect} from "react";
import axios from 'axios';

import CharacterCard from "./CharacterCard";
import ButtonUp from "./ButtonUp";
import Loader from "./Loader";

const CharacterList = ()=>{

    const[characters, setCharacters]= useState([]);
    const[currentPage, setCurrentPage]= useState(1);
    const[fetching, setFetching]= useState(true);
    

    const fetchCharacters= async () => {
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${currentPage}`);
            setCharacters([...characters, ...response.data.results ]);
            setCurrentPage( prevState => prevState +1);
        } catch (error) {
            console.error('Error fetching characters:', error)
        } finally {
            setFetching(false);
        }
    };


    useEffect( ()=>{

        if(fetching) {
            console.log('fetching');
            fetchCharacters();
        }

    },[fetching]);


    useEffect( ()=>{

        document.addEventListener('scroll', scrollHandler)

        return function () {
            document.removeEventListener('scroll', scrollHandler)
        };

    },[]);

    const scrollHandler =(e)=>{

        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            setFetching(true);
        }
    };



    return ( <div className="character_list">

                {fetching && <Loader/>}
                <ButtonUp></ButtonUp>

                {characters.map ((character) => (
                    <CharacterCard key={character.id} character={character}/>
                ))}

            </div>
          )

};

export default CharacterList;