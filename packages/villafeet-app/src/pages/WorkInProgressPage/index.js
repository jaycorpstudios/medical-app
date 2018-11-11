import React from 'react'
import './WorkInProgressPage.scss'
export default function WorkInProgressPage (props) {
  return (
    <div className='WorkInProgressPage'>
      <section className="WorkInProgressPage__container">
        <img src={require('./../../theme/images/in-progress.png')} alt="Work in progress"/>
        <h1 className="theme-heading-medium">Próximamente</h1>
        <h2 className="theme-body-small">Trabajo en progreso…</h2>
      </section>
    </div>
  )
}
