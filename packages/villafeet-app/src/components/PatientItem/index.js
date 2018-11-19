import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';


import './PatientItem.scss';

export default class PatientItem extends React.Component {

    render(){
        const { nombre, ultimaVisita:timestamp = '', id } = this.props;

        const ultimaVisita = timestamp.toDate && timestamp.toDate() || '';

        return(
            <Link to={`/pacientes/${id}`}>
                <article className="PatientItem">
                    <img className="PatientItem__user-photo" src={require('./../../theme/images/user.png')} alt="User Photo"/>
                    <span className="theme-body-small">{nombre}</span>
                    <span className="PatientItem__last-visit theme-body-small hidden-xs">
                        <Moment date={ultimaVisita} format="dddd DD MMMM YYYY" locale="es"/>
                    </span>
                    <button className="PatientItem__contact-btn visible-xs"></button>
                    <button className="PatientItem__edit-btn hidden-xs"></button>
                </article>
            </Link>
        )
    }
}