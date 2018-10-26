import React from 'react'
import { LoginPage, PatientsPage } from '../AppLazyLoader'
import { BrowserRouter, Route, Link } from 'react-router-dom'

export default function AppRouter (props) {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Route exact path='/' component={LoginPage} />
        <Route path='/pacientes' component={PatientsPage} />
      </React.Fragment>
    </BrowserRouter>
  )
}
