import React from 'react';
import classnames from 'classnames';
import './ThemeButtonDefault.scss';

export default class ThemeButtonDefault extends React.Component {

    render(){
        const { className, title, icon, ...other} = this.props;
        const onlyIcon = !title && icon;
        const classes = classnames('ThemeButtonDefault', { 'onlyIcon': onlyIcon }, className );
        const iconClasses = classnames('material-icons', { 'withText' : title });

        return(
            <button
              className={classes}
              {...other}>
              {icon && <i className={iconClasses}>{icon}</i>}{title}
            </button>
        )
    }
}