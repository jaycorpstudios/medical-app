import React from 'react';
import ThemeInput from  './../../components/ThemeInput';
import ThemeButton from  './../../components/ThemeButton';
import './PatientsPage.scss';

export default function PatientsPage (props) {
  return (
    <div className="PatientsPage">
      <div className="PatientsPage__header hidden-xs">
        <h1 className="theme-heading-large">Listado de pacientes</h1>
      </div>
      <ThemeInput className="PatientsPage__filter" type="search" icon="search" placeholder="Nombre del paciente"/>
      <section className="PatientsPage__list"></section>
      <div className="PatientsPage__mobile-cta visible-xs">
        <ThemeButton title="Agregar"/>
      </div>
    </div>
  )
}
