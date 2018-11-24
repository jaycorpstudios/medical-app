import React from 'react';
import PatientItem from './../PatientItem';
import LoadingState from './../LoadingState';
import './PatientsList.scss';

const PatientsList = props => {

    const { patients, loading } = props;

    const Patients = ({component: Component}) => {
        return patients.map(({id, ...rest}) => {
            return(<Component key={id} {...rest} />)
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
            { loading ? <LoadingState/> : patients.length > 0 ? <Patients component={PatientItem}/> : <NoMatch/> }
        </section>
    );
}

export default PatientsList;