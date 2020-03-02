import React from 'react';
import './PatientSectionTabs.scss';

const PatientSectionTabs = () => (
  <nav className="PatientSectionTabs visible-xs">
    <ul className="theme-body-regular">
      <li className="active">Personal</li>
      <li>Médico</li>
      <li>Consultas</li>
    </ul>
  </nav>
);

export default PatientSectionTabs;
