import React, { Fragment } from 'react';

import './RainbowFrame.css';


let withRainbowFrame = colors => Comp => props => {
    
    let code=<Comp {...props} />;
    for( let color of colors) {
        code=<div style={ { border:`solid 10px ${color}`}}>{code}</div>
    }
    
    return <Fragment>{code}</Fragment>;

}

    
export { withRainbowFrame };


