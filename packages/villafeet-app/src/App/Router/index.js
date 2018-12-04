import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import { Provider } from 'react-redux';

import store from './../../store';
import { LoginPage, PatientsPage, PatientDetailsPage, PatientAddPage,
         NotFoundPage, WorkInProgressPage } from '../AppLazyLoader';
import MainLayout from './../../MainLayout';

export default props => {

  return (
    <Provider store={store}>
      <BrowserRouter basename='/'>
        <React.Fragment>
          <Switch>
            <Route exact path='/' component={LoginPage} />
            <MainLayout exact path='/pacientes/agregar' component={PatientAddPage}/>
            <MainLayout path='/pacientes/:idPaciente' component={PatientDetailsPage}/>
            <MainLayout path='/pacientes' component={PatientsPage}/>
            <MainLayout path='/agenda' component={WorkInProgressPage}/>
            <MainLayout path='/consultas' component={WorkInProgressPage}/>
            <Route path='*/' component={NotFoundPage} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    </Provider>
  )

}
