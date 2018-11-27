import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import LoadingState from './../../components/LoadingState';
import PatientDetailsHeader from './../../components/PatientDetails/PatientDetailsHeader';
import PatientSectionTabs from './../../components/PatientDetails/PatientSectionTabs';
import PatientDetailsGroup from './../../components/PatientDetails/PatientDetailsGroup';
import TernaryButton from './../../components/TernaryButton';

import './PatientDetailsPage.scss';

class PatientDetailsPage extends React.Component {

  constructor(props){
    super(props);
    this.state = { selectedTab: 'personal' }
  }

  render(){

    const {
            patients:[patient = {} ] = [],
            status:{requesting:request} = {},
            match: { params:{idPaciente} } = ''
          } = this.props;
    const requesting = request[`pacientes/${idPaciente}`];
    const { avatarUrl, nombre, ultimaVisita } = patient;

    const { data = {} } = this.props;


    if(requesting) {
      return <LoadingState/>
    }

    return (
      <article className="PatientDetailsPage">
        <section className="PatientDetailsPage__back hidden-xs">
          <Link to={'/pacientes'}><TernaryButton title='Regresar'/></Link>
        </section>
        <PatientDetailsHeader nombre={nombre} avatarUrl={avatarUrl} ultimaVisita={ultimaVisita} />
        <PatientSectionTabs/>
        <section className="PatientDetailsPage__details">
          <PatientDetailsGroup />
        </section>
      </article>
    )
  }
}

function mapStateToProps (state, props) {
  return {
    patients: state.firestore.ordered.pacientes,
    data: state.firestore.data.pacientes,
    status: state.firestore.status
  }
}

function mapFirebase (props) {
   const {idPaciente} = props.match.params;
  return [
    `/pacientes/${idPaciente}`
   ]
}

export default compose(firestoreConnect(mapFirebase), connect(mapStateToProps, null))(PatientDetailsPage)
