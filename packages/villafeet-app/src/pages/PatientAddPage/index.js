import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { addPatient } from './../../actions';
import ThemeButton from  './../../components/ThemeButton';
import FormGroupData from './../../components/FormGroupData';
import { PatientFormData, AntecedentesFormData } from './FormData';
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
    this.setState({formData: { personal: PatientFormData, medicalHistory: AntecedentesFormData } });
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
      return <Redirect to={ { pathname: '/pacientes' } } />
    }
    return (
      <article className="PatientAddPage">
        { inProgress ? <LoadingLayer/> : null }
        <header className="PatientAddPage__header hidden-xs">
          <h1 className="theme-heading-large">Alta de paciente</h1>
        </header>
        <form className="PatientAddPage__form" autoComplete="off" onSubmit={this.processPatient}>
          <FormGroupData title='Datos personales' data={this.state.formData.personal} section="personal" handleInputData={this.handleInputData}/>
          <FormGroupData title='Antecedentes médicos' data={this.state.formData.medicalHistory} section="medicalHistory" handleInputData={this.handleInputData}/>
          <ThemeButton className="PatientAddPage__saveBtn" title="Agregar" onClick={this.processPatient}/>
          <ThemeButton className="PatientAddPage__cancelBtn" title="Cancelar" secondary={true} onClick={this.goBack}/>
        </form>
      </article>
    )
  }
}

function mapStateToProps (state) {
  return {
    status: state.patients.record
  }
}
function mapDispatchToProps (dispatch) {
  return {
      addPatient: patient => { dispatch(addPatient(patient)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientAddPage)
