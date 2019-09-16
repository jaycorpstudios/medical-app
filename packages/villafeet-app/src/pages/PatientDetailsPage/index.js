import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPatient, fetchReset, removePatient } from './../../actions'
import { FETCH_KEY_GET_PATIENT } from './../../actions/types'
import LoadingState from './../../components/LoadingState';
import PatientDetailsHeader from './../../components/PatientDetails/PatientDetailsHeader';
import PatientSectionTabs from './../../components/PatientDetails/PatientSectionTabs';
import PatientDetailsGroup from './../../components/PatientDetails/PatientDetailsGroup';
import ThemeButtonPrimary from './../../components/ThemeButtonPrimary';
import ThemeButtonDefault from './../../components/ThemeButtonDefault';
import DropDown from './../../components/DropDown';
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

  //TODO: Open modal and confirm action before patient is removed.
  onRemovePatient = () => {
    const { idPaciente = '' } = this.props.match.params;
    this.props.removePatient(idPaciente);
    this.props.history.push(`/pacientes`)
  }

  editPatient = (_id) => () => {
    this.props.history.push(`/pacientes/editar/${_id}`)
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

    const dropDownOptions = [
      { title: 'Editar paciente', icon: 'edit', onClick: this.editPatient(_id) },
      { title: 'Borrar paciente', icon: 'delete_outline', onClick: this.onRemovePatient }
    ];

    return (
      <article className="PatientDetailsPage">
        <section className="PatientDetailsPage__back hidden-xs">
          <Link to={'/pacientes'}><ThemeButtonDefault title='Regresar' icon='arrow_back' noShadow={true}/></Link>
        </section>
        <PatientDetailsHeader name={fullName} gender={gender} avatar={avatar} lastVisit={lastVisit}>
          <ThemeButtonPrimary title='Iniciar consulta' icon='play_arrow' className="hidden-xs"/>
          <DropDown options={dropDownOptions} icon='more_horiz'/>
        </PatientDetailsHeader>
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
