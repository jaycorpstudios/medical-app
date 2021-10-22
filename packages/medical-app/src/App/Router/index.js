import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import loadable from '@loadable/component';
import store from '../../store';
import {
  LoginPage, PatientsPage, PatientDetailsPage, PatientAddPage,
  NotFoundPage, WorkInProgressPage,
} from '../AppLazyLoader';
import MainLayout from '../../MainLayout';

const LoadablePatienDetailsPage = loadable(() => import('../../pages/PatientDetailsPage'), { fallback: <div>Loading...</div> });

const AppRouter = () => (
  <Provider store={store}>
    <BrowserRouter basename="/">
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <MainLayout exact path="/pacientes/agregar" component={PatientAddPage} />
        <MainLayout exact path="/pacientes/editar/:idPaciente" component={PatientAddPage} />
        <MainLayout path="/pacientes/:idPaciente" component={LoadablePatienDetailsPage} />
        <MainLayout path="/pacientes" component={PatientsPage} />
        <MainLayout path="/agenda" component={WorkInProgressPage} />
        <MainLayout path="/consultas" component={WorkInProgressPage} />
        <Route path="*/" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default AppRouter;
