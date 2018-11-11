import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import { LoginPage, PatientsPage, NotFoundPage } from '../AppLazyLoader';
import MainLayout from './../../MainLayout';


export default function AppRouter (props) {

  const userAuthenticated = true; //Temporal value for development

  return (
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <MainLayout path='/pacientes' auth={userAuthenticated} component={PatientsPage}/>
          <Route component={NotFoundPage} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  )
}
