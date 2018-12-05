import React from 'react';
import { Link } from 'react-router-dom';
import UserPhoto from './../UserPhoto';

import dateUtils from './../../utils/dateUtils';
import './PatientListItem.scss';

export default class PatientListItem extends React.Component {

    render(){
        const { avatarUrl, id, ultimaVisita:timestamp = ''  } = this.props;
        const { nombre, apellidoPaterno='', apellidoMaterno='', sexo:gender } = this.props.personal;
        const nombreCompleto = `${nombre} ${apellidoPaterno} ${apellidoMaterno}`;

        const ultimaVisita = timestamp.toDate && timestamp.toDate() || null;
        const time = dateUtils.getFormatedDate(ultimaVisita);

        return(
            <Link to={`/pacientes/${id}`}>
                <article className="PatientListItem">
                    <UserPhoto className="PatientListItem__user-photo" src={avatarUrl} name={nombreCompleto} gender={gender}/>
                    <span className="theme-body-small">{nombreCompleto}</span>
                    <span className="PatientListItem__last-visit theme-body-small hidden-xs">{time}</span>
                    <button className="PatientListItem__contact-btn visible-xs"></button>
                    <button className="PatientListItem__edit-btn hidden-xs"></button>
                </article>
            </Link>
        )
    }
}