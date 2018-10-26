import React from 'react'
import './PatientsPageLayout.scss'
export default function PatientsPage (props) {
  return (
    <main className='PatientsPage'>
      <header>
        <figure>VillaFeet Isotipo</figure>
        <h1>Pacientes</h1>
        <button className="MobileNavButton"></button>
      </header>
      <aside className="NavigationBar">
        <nav>
          <ul>
            <li>Pacientes</li>
            <li>Agenda</li>
            <li>Consultas</li>
          </ul>
        </nav>
      </aside>
      <section className="PatientsFilter">
        <input type="text" className="theme-input" placeholder="Nombre del paciente"/>
      </section>
      <section className="PatientsList">

      </section>
    </main>
  )
}
