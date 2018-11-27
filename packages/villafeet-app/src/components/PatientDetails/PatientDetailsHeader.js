import React from 'react';
import { Link } from 'react-router-dom';
import './PatientDetailsHeader.scss';


const PatientDetailsHeader = props => {

    const { avatarUrl, nombre, ultimaVisita } = props;

    return(
        <section className="PatientDetailsHeader">
          <Link className="PatientDetailsHeader__back visible-xs" to={'/pacientes'}></Link>
          <img className="PatientDetailsHeader__user-photo" src={avatarUrl} alt={nombre}/>
          <div>
            <h1 className="theme-heading-small PatientDetailsHeader__name">{nombre}</h1>
            <h3 className="theme-body-small PatientDetailsHeader__consulta">Última consulta: <br className="visible-xs"/>7 de Noviembre del 2018</h3>
          </div>
        </section>
    )
}

export default PatientDetailsHeader;