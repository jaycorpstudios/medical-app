import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { addPatient, fetchReset } from './../../actions';
import { FETCH_KEY_ADD_PATIENT } from './../../actions/types'
import ThemeButton from  './../../components/ThemeButton';
import FormGroupData from './../../components/FormGroupData';
import { PatientFormData, AddressFormData, ContactFormData } from './FormData';
import ParsePatient from './ParsePatient';
import LoadingLayer from './../../components/LoadingLayer';

import './PatientAddPage.scss';

class PatientAddPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hasErrors: false,
      errorMessage: '',
      formData: {}
    }
    this.handleInputData = this.handleInputData.bind(this);
    this.processPatient = this.processPatient.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentWillMount() {
    this.setState({ formData: { patient: PatientFormData, address: AddressFormData, contact: ContactFormData } });
  }

  componentWillUnmount() {
    this.props.patientStatusRestore()
  }

  getDataFromField(name, section) {
    return this.state.formData[section].find( input => input.name === name );
  }

  handleInputData (event) {
    const { value, name, dataset } = event.target;
    const section = dataset.section;
    const target = {...this.getDataFromField(name, section), value };
    const sectionData = [...this.state.formData[section].filter( item => item.name !== name ), target].sort( (a,b) => a.id - b.id );
    this.setState({formData: {...this.state.formData, [section]: sectionData } });
  }

  goBack(){
    this.props.history.push('/pacientes')
  }

  processPatient (event) {
    event.preventDefault();
    if(this.state.hasErrors){
      return
    }
    const patientModel = ParsePatient(this.state.formData);
    this.props.addPatient(patientModel);
  }

  render() {
    const { status: { inProgress = false, success = false } = {} } = this.props;
    if(!inProgress && success) {
      const { patient } = this.props;
      return <Redirect to={ { pathname: `/pacientes/${patient._id}` } } />
    }
    return (
      <article className="PatientAddPage">
        { inProgress ? <LoadingLayer/> : null }
        <header className="PatientAddPage__header hidden-xs">
          <h1 className="theme-heading-large">Alta de paciente</h1>
        </header>
        <form className="PatientAddPage__form" autoComplete="off" onSubmit={this.processPatient}>
          <FormGroupData title='Datos personales' data={this.state.formData.patient} section="patient" handleInputData={this.handleInputData}/>
          <FormGroupData title='Contacto' data={this.state.formData.contact} section="contact" handleInputData={this.handleInputData}/>
          <FormGroupData title='Dirección' data={this.state.formData.address} section="address" handleInputData={this.handleInputData}/>
          <ThemeButton className="PatientAddPage__saveBtn" title="Agregar" onClick={this.processPatient}/>
          <ThemeButton className="PatientAddPage__cancelBtn" title="Cancelar" secondary={true} onClick={this.goBack}/>
        </form>
      </article>
    )
  }
}

function mapStateToProps (state) {
  const { newRecord } = state.patients;
  return {
    status: newRecord.status,
    patient: newRecord.data 
  }
}
function mapDispatchToProps (dispatch) {
  return {
      addPatient: patient => { dispatch(addPatient(patient)) },
      patientStatusRestore: () => { dispatch(fetchReset(FETCH_KEY_ADD_PATIENT)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientAddPage)
