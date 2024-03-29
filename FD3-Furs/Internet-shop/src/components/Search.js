import React from 'react';
import debounce from 'lodash.debounce';
import { AppContext } from '../App';


const Search = () => {
    const [value, setValue] = React.useState('');

    const {setSearchValue}= React.useContext(AppContext);


    const Clear = () => {
        setSearchValue('');
        setValue('');
    };
    const updateSearchValue = React.useCallback(
        debounce ( (str) => {
            setSearchValue(str); 
        },500),
        [],
    );

    const onChangeInput = (event) => {
        setValue(event.target.value);
        updateSearchValue (event.target.value);
    };

    return (
        <div className='search_wrap'>
            <svg className='icon_search'  id="Layer_1" version="1.1" viewBox="0 0 512 512"   xmlns="http://www.w3.org/2000/svg" ><path d="M448.3,424.7L335,311.3c20.8-26,33.3-59.1,33.3-95.1c0-84.1-68.1-152.2-152-152.2c-84,0-152,68.2-152,152.2  s68.1,152.2,152,152.2c36.2,0,69.4-12.7,95.5-33.8L425,448L448.3,424.7z M120.1,312.6c-25.7-25.7-39.8-59.9-39.8-96.3  s14.2-70.6,39.8-96.3S180,80,216.3,80c36.3,0,70.5,14.2,96.2,39.9s39.8,59.9,39.8,96.3s-14.2,70.6-39.8,96.3  c-25.7,25.7-59.9,39.9-96.2,39.9C180,352.5,145.8,338.3,120.1,312.6z"/></svg>
            <input value={value} onChange={ onChangeInput} className='search' placeholder='Поиск...'/>
            {
              value && <svg onClick={ Clear } className='icon_close'  viewBox="0 0 48 48"  xmlns="http://www.w3.org/2000/svg"><path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z"/><path d="M0 0h48v48h-48z" fill="none"/></svg>
            }
            
        </div>
        
    )
};

export default Search;