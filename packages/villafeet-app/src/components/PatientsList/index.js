import React from 'react';
import PatientListItem from '../PatientListItem';
import LoadingState from '../LoadingState';
import './PatientsList.scss';

const PatientsList = (props) => {
  const { patients, loading } = props;

  const Patients = ({ component: Component }) => patients.map(({ _id, ...rest }, index) => (<Component key={index} id={_id} {...rest} />));

  const NoMatch = () => (
    <article className="PatientsList__NoMatch">
      <h1 className="theme-heading-small">No hay pacientes con ese nombre</h1>
    </article>
  );

  return (
    <section className="PatientsList">
      { loading ? <LoadingState /> : patients.length > 0 ? <Patients component={PatientListItem} /> : <NoMatch /> }
    </section>
  );
};

export default PatientsList;
