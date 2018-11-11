import React, { Component } from 'react';
import './UserHeader.scss';

export default props => {
    return (
        <header className="UserHeader visible-lg">
            <button className="UserHeader__action notifications"></button>
            <button className="UserHeader__action settings"></button>
            <figure className="UserHeader__user">
                <figcaption className="theme-body-small">Tania García</figcaption>
                <img src={require('./../../theme/images/user.png')} alt="User Photo"/>
            </figure>
        </header>
    )
}