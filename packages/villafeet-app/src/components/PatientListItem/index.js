import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';


import './PatientListItem.scss';

export default class PatientListItem extends React.Component {

    render(){
        const { nombre, avatarUrl, id, ultimaVisita:timestamp = ''  } = this.props;

        const ultimaVisita = timestamp.toDate && timestamp.toDate() || '';

        return(
            <Link to={`/pacientes/${id}`}>
                <article className="PatientListItem">
                    <img className="PatientListItem__user-photo" src={avatarUrl} alt="User Photo"/>
                    <span className="theme-body-small">{nombre}</span>
                    <span className="PatientListItem__last-visit theme-body-small hidden-xs">
                        <Moment date={ultimaVisita} format="dddd DD MMMM YYYY" locale="es"/>
                    </span>
                    <button className="PatientListItem__contact-btn visible-xs"></button>
                    <button className="PatientListItem__edit-btn hidden-xs"></button>
                </article>
            </Link>
        )
    }
}