import React from 'react';
import './ThemeButton.scss';

export default class ThemeButton extends React.Component {

    render(){
        const {secondary, big, className, title, ...other} = this.props;
        const classes = `${'ThemeButton'} ${secondary ? '--secondary' : '--primary'} ${big ? '--block' : ''} ${className}`;

        return(
            <button className={classes} {...other}>{title}</button>
        )
    }
}

ThemeButton.defaultProps = {
    big: false,
    secondary: false
}