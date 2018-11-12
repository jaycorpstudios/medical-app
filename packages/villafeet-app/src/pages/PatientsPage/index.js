import React from 'react';
import ThemeInput from  './../../components/ThemeInput';
import ThemeButton from  './../../components/ThemeButton';
import PatientItem from './../../components/PatientItem';
import './PatientsPage.scss';

export default function PatientsPage (props) {

  const patients = [
    {id: 1, name: 'Karla DoSantos', lastVisit: 'Martes 23 de Octubre de 2018' },
    {id: 2, name: 'Daniela Vargas', lastVisit: 'Domingo 11 de Noviembre de 2018' },
    {id: 3, name: 'Karla DoSantos', lastVisit: 'Martes 23 de Octubre de 2018' },
    {id: 4, name: 'Karla DoSantos', lastVisit: 'Martes 23 de Octubre de 2018' },
    {id: 5, name: 'Karla DoSantos', lastVisit: 'Martes 23 de Octubre de 2018' },
    {id: 6, name: 'Karla DoSantos', lastVisit: 'Martes 23 de Octubre de 2018' },
    {id: 7, name: 'Karla DoSantos', lastVisit: 'Martes 23 de Octubre de 2018' },
    {id: 8, name: 'Karla DoSantos', lastVisit: 'Martes 23 de Octubre de 2018' },
    {id: 9, name: 'Karla DoSantos', lastVisit: 'Martes 23 de Octubre de 2018' },
    {id: 10, name: 'Karla DoSantos', lastVisit: 'Martes 23 de Octubre de 2018' },
    {id: 11, name: 'Karla DoSantos', lastVisit: 'Martes 23 de Octubre de 2018' },
    {id: 12, name: 'Karla DoSantos', lastVisit: 'Martes 23 de Octubre de 2018' },
    {id: 13, name: 'Karla DoSantos', lastVisit: 'Martes 23 de Octubre de 2018' },
    {id: 14, name: 'Karla DoSantos', lastVisit: 'Martes 23 de Octubre de 2018' },
    {id: 15, name: 'Karla DoSantos', lastVisit: 'Martes 23 de Octubre de 2018' },
    {id: 16, name: 'Karla DoSantos', lastVisit: 'Martes 23 de Octubre de 2018' }
  ]

  return (
    <div className="PatientsPage">
      <div className="PatientsPage__header hidden-xs">
        <h1 className="theme-heading-large">Listado de pacientes</h1>
      </div>
      <ThemeInput className="PatientsPage__filter" type="search" icon="search" placeholder="Nombre del paciente"/>
      <section className="PatientsPage__list">
          {patients.map(({id, name, lastVisit}) => <PatientItem key={id} id={id} name={name} lastVisit={lastVisit} />)}
      </section>
      <div className="PatientsPage__mobile-cta visible-xs">
        <ThemeButton title="Agregar"/>
      </div>
    </div>
  )
}
