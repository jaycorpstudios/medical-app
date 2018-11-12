import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import { LoginPage, PatientsPage, NotFoundPage, WorkInProgressPage } from '../AppLazyLoader';
import MainLayout from './../../MainLayout';

export default function AppRouter (props) {

  const userAuthenticated = true; //Temporal value for development

  return (
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <MainLayout path='/pacientes' auth={userAuthenticated} component={PatientsPage}/>
          <MainLayout path='/agenda' auth={userAuthenticated} component={WorkInProgressPage}/>
          <MainLayout path='/consultas' auth={userAuthenticated} component={WorkInProgressPage}/>
          <Route path='*/' component={NotFoundPage} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  )
}
