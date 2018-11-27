import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.scss';

export default props => {
    const { path: currentPath } = props;

    const NavLinks = ({component: Component, currentPath}) => {
        const sections = [
            { id: 1, name: 'pacientes', path: '/pacientes' },
            { id: 2, name: 'agenda', path: '/agenda' },
            { id: 3, name: 'consultas', path: '/consultas' }
        ];
        const isActive = (path, currentPath) => currentPath.startsWith(path) ? 'active' : '';
        const mapLink = ({id, name, path}) => (<Component key={id} className={`NavigationBar__item ${name} ${isActive(path, currentPath)}`} to={path}>{name}</Component>);
        return sections.map(mapLink);
    };

    return (
        <aside className="NavigationBar visible-lg">
            <img className="NavigationBar__logo" src={require('./../../theme/images/villafeet-logo.svg')}/>
            <nav className="NavigationBar__nav">
                <NavLinks component={Link} currentPath={currentPath}/>
            </nav>
        </aside>
    )
}