import React from 'react';
import { Link } from 'react-router-dom';
import './PatientDetailsHeader.scss';

import UserPhoto from './../UserPhoto';
import dateUtils from './../../utils/dateUtils';


const PatientDetailsHeader = props => {

    const { avatarUrl, nombre, ultimaVisita:timestamp, gender } = props;
    const ultimaVisita = timestamp.toDate && timestamp.toDate() || null;

    const time = dateUtils.getFormatedDate(ultimaVisita);

    return(
        <section className="PatientDetailsHeader">
          <Link className="PatientDetailsHeader__back visible-xs" to={'/pacientes'}></Link>
          <UserPhoto className="PatientDetailsHeader__user-photo" src={avatarUrl} name={nombre} gender={gender}/>
          <div>
            <h1 className="theme-heading-small PatientDetailsHeader__name">{nombre}</h1>
            {time && <h3 className="theme-body-small PatientDetailsHeader__consulta">Última consulta: <br className="visible-xs"/>{time}</h3>}
          </div>
        </section>
    )
}

export default PatientDetailsHeader;