import React, { Fragment, useState, useEffect } from 'react';

import './Controls.css';


const Controls = props => {

    const [filter,setFilter]= useState("");
    const [sort,setSort]= useState(false);

    useEffect( () => {

        props.apply && props.apply(sort,filter);

        },[sort,filter])

    function sortChanged(eo) {
        setSort(eo.target.checked)
    }

    function filterChanged(eo) {
        setFilter(eo.target.value)
    }

    function reset() {
        setFilter("");
        setSort(false);
    }

    return (
        <Fragment>
            <input type="checkbox" checked={sort} onChange={sortChanged}/>
            <input type="text" value={filter} onChange={filterChanged}/>
            <input type="button" value="сбросить" onClick={reset}/>
        </Fragment>
        
    );
}

export default Controls;
