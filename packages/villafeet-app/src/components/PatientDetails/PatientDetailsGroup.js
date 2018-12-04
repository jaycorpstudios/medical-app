import React from 'react';
import ThemeGroupTitle from './../ThemeGroupTitle';
import './PatientDetailsGroup.scss';


const PatientDetailsGroup = props => {
    return(
        <article className="PatientDetailsGroup">
          <ThemeGroupTitle title='Datos personales'/>
          <ul className="PatientDetailsGroup__list theme-body-regular">
            <li><strong>Edad</strong> <span>29 años</span></li>
            <li><strong>Calle</strong> <span>Av. Puerto Escondido 2645, int 28</span></li>
            <li><strong>Municipio</strong><span>Zapopan</span></li>
            <li><strong>Estado</strong><span>Jalisco</span></li>
            <li><strong>Ocupación</strong> <span>Estudiante</span></li>
          </ul>
        </article>
    )
}

export default PatientDetailsGroup;