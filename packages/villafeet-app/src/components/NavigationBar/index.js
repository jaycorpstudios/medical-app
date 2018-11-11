import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.scss';

export default props => {
    return (
        <aside className="NavigationBar visible-lg">
            <img className="NavigationBar__logo" src={require('./../../theme/images/villafeet-logo.svg')}/>
            <nav className="NavigationBar__nav">
                <Link className="NavigationBar__item pacientes active" to='/pacientes'>Pacientes</Link>
                <Link className="NavigationBar__item agenda" to='/agenda'>Agenda</Link>
                <Link className="NavigationBar__item consultas" to='/consultas'>Consultas</Link>
            </nav>
        </aside>
    )
}