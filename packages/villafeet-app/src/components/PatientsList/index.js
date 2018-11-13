import React from 'react';
import PatientItem from './../PatientItem';
import './PatientsList.scss';

const PatientsList = props => {

    const { patients } = props;

    const Patients = ({component: Component}) => {
        return patients.map(({id, name, lastVisit}) => {
            return(<Component key={id} id={id} name={name} lastVisit={lastVisit} />)
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
            {patients.length > 0 ? <Patients component={PatientItem}/> : <NoMatch/> }
        </section>
    );
}

export default PatientsList;