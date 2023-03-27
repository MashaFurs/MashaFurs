import React from 'react';

import './List.css';


const List = props => {
    
    

    return (
        <div className='words'>
            {props.words.join("\n")};
        </div>   
    );
}

export default List;
