import React from 'react';
import PatientListItem from './../PatientListItem';
import LoadingState from './../LoadingState';
import './PatientsList.scss';

const PatientsList = props => {

    const { patients, loading } = props;

    const Patients = ({component: Component}) => {
        return patients.map(({id, ...rest}) => {
            return(<Component key={id} id={id} {...rest} />)
        })
    }

    const NoMatch = () => {
        return (
            <article className="PatientsList__NoMatch">
                <h1 className="theme-heading-small">No hay pacientes con ese nombre</h1>
            </article>
        );
    }

    return (
        <section className="PatientsList">
            { loading ? <LoadingState/> : patients.length > 0 ? <Patients component={PatientListItem}/> : <NoMatch/> }
        </section>
    );
}

export default PatientsList;