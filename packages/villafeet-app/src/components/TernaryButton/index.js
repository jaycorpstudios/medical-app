import React from 'react';
import './TernaryButton.scss';

export default class TernaryButton extends React.Component {

    render(){
        const { className, title, ...other} = this.props;
        const classes = `TernaryButton ${className}`;

        return(
            <button className={classes} {...other}>{title}</button>
        )
    }
}