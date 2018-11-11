import React, { Component } from 'react';
import './MobileHeader.scss';

export default props => {
    return (
        <div className="MobileHeader hidden-lg">
            <img src={require('./../../theme/images/villafeet-iso.svg')} className="MobileHeader__iso"/>
            <h1 className="MobileHeader__title theme-body-regular">PACIENTES</h1>
            <button className="MobileHeader__menu-btn"></button>
        </div>
    )
}