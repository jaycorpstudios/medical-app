import React from 'react';
import { Link } from 'react-router-dom';

import './PatientDetailsHeader.scss';
import UserPhoto from './../UserPhoto';
import dateUtils from './../../utils/dateUtils';


const PatientDetailsHeader = props => {

    const { avatar, name, lastVisit, gender, children } = props;
    const time = dateUtils.getFormatedDate(lastVisit);

    return(
        <section className="PatientDetailsHeader">
          <Link className="PatientDetailsHeader__back visible-xs" to={'/pacientes'}></Link>
          <UserPhoto className="PatientDetailsHeader__user-photo" src={avatar} name={name} gender={gender}/>
          <div>
            <h1 className="theme-heading-small PatientDetailsHeader__name">{name}</h1>
            {time && <h3 className="theme-body-small PatientDetailsHeader__consulta">Última consulta: <br className="visible-xs"/>{time}</h3>}
          </div>
          {children}
        </section>
    )
}

export default PatientDetailsHeader;