import React from 'react';
import { Link } from 'react-router-dom';
import './PatientItem.scss';

export default class PatientItem extends React.Component {

    render(){

        const { name, lastVisit, id } = this.props;

        return(
            <Link to={`/pacientes/${id}`}>
                <article className="PatientItem">
                    <img className="PatientItem__user-photo" src={require('./../../theme/images/user.png')} alt="User Photo"/>
                    <span className="theme-body-small">{name}</span>
                    <span className="PatientItem__last-visit theme-body-small hidden-xs">{lastVisit}</span>
                    <button className="PatientItem__contact-btn visible-xs"></button>
                    <button className="PatientItem__edit-btn hidden-xs"></button>
                </article>
            </Link>
        )
    }
}