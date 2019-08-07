import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPatient, fetchReset, removePatient } from './../../actions'
import { FETCH_KEY_GET_PATIENT } from './../../actions/types'
import LoadingState from './../../components/LoadingState';
import PatientDetailsHeader from './../../components/PatientDetails/PatientDetailsHeader';
import PatientSectionTabs from './../../components/PatientDetails/PatientSectionTabs';
import PatientDetailsGroup from './../../components/PatientDetails/PatientDetailsGroup';
import TernaryButton from './../../components/TernaryButton';
import MapPatientData from './mapPatientData';

import './PatientDetailsPage.scss';

class PatientDetailsPage extends React.Component {

  constructor(props){
    super(props);
    this.state = { selectedTab: 'personal' }
  }

  componentWillMount() {
    const {idPaciente = ''} = this.props.match.params;
    this.props.fetchPatient(idPaciente)
  }

  componentWillUnmount() {
    this.props.patientStatusRestore()
  }

  onRemovePatient() {
    const {idPaciente = ''} = this.props.match.params;
    this.props.removePatient(idPaciente)
  }

  render() {
    const {
            patient = {},
            status: { inProgress = true } = {}
          } = this.props;

    const { _id = null, name = '', firstSurname = '', secondSurname = '', gender, avatar, lastVisit, contact = {}, address = {}, others = {} } = patient;
    const fullName = `${name} ${firstSurname} ${secondSurname}`;
    patient.profession = others.profession;

    const contactData = MapPatientData(contact, 'contact');
    const addressData = MapPatientData(address, 'address');
    const personalData = MapPatientData(patient, 'personal');

    if(inProgress) return <LoadingState/>

    return (
      <article className="PatientDetailsPage">
        <section className="PatientDetailsPage__back hidden-xs">
          <Link to={'/pacientes'}><TernaryButton title='Regresar' negative={true} icon='back'/></Link>
          <Link to={`/pacientes/editar/${_id}`}><TernaryButton title='Editar' negative={true}/></Link>
          <TernaryButton title='Borrar' negative={true} onClick={ () => { this.onRemovePatient() } }/>
        </section>
        <PatientDetailsHeader name={fullName} gender={gender} avatar={avatar} lastVisit={lastVisit} />
        <PatientSectionTabs/>
        <section className="PatientDetailsPage__details">
          <PatientDetailsGroup title='Datos personales' data={personalData}/>
          <PatientDetailsGroup title='Contacto' data={contactData}/>
          <PatientDetailsGroup title='Dirección' data={addressData}/>
        </section>
      </article>
    )
  }
}

function mapStateToProps (state) {
  const { detail } = state.patients;
  return {
    patient: detail.data,
    status: detail.status
  }
}

function mapDispatchToProps (dispatch) {
  return {
      patientStatusRestore: () => { dispatch(fetchReset(FETCH_KEY_GET_PATIENT)) },
      fetchPatient: (idPatient) => { dispatch(fetchPatient(idPatient)) },
      removePatient: (idPatient) => { dispatch(removePatient(idPatient)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetailsPage)
