import React from 'react';
import classnames from 'classnames';
import './ThemeButtonDefault.scss';

export default class ThemeButtonDefault extends React.Component {

    render(){
        const { className, title, icon, noShadow, active, ...other } = this.props;
        const onlyIcon = !title && icon;
        const classes = classnames('ThemeButtonDefault', { 'onlyIcon': onlyIcon }, { 'noShadow': noShadow }, { 'active': active }, className );
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

ThemeButtonDefault.defaultProps = {
    noShadow: false
}