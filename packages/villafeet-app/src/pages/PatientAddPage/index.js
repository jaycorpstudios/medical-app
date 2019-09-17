import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { addPatient, fetchPatient, fetchReset } from './../../actions';
import { FETCH_KEY_ADD_PATIENT } from './../../actions/types'
import ApiService from './../../services/ApiService';
import ThemeButton from  './../../components/ThemeButton';
import FormGroupData from './../../components/FormGroupData';
import { PatientFormData, AddressFormData, ContactFormData, OthersFormData } from './FormData';
import ParsePatient, { fillFormData } from './ParsePatient';
import LoadingLayer from './../../components/LoadingLayer';
import FormValidator from './../../services/FormValidator';
import AlertService from './../../services/AlertService';
import PatientDetailsHeader from './../../components/PatientDetails/PatientDetailsHeader';

import './PatientAddPage.scss';

class PatientAddPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hasErrors: false,
      errorMessage: '',
      formData: {},
      editMode: false,
      patientDataPopulated: false
    }
    this.handleInputData = this.handleInputData.bind(this);
    this.resetValue = this.resetValue.bind(this);
    this.processPatient = this.processPatient.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentWillMount() {
    const { idPaciente : idPatient = null } = this.props.match.params;
    if(idPatient) {
      this.props.fetchPatient(idPatient);
    }
    this.setState({
      formData: {
        patient: PatientFormData,
        address: AddressFormData,
        contact: ContactFormData,
        others: OthersFormData
      },
      editMode: idPatient ? true : false,
    });
  }

  componentWillUnmount() {
    this.props.patientStatusRestore()
  }

  async handleFileUpload (files, section, name) {
    const [ file ] = files;
    const formData = new FormData();
    formData.append(`avatar`, file);
    const options = { body: formData };
    //Todo create method to update sections.
    let target = {...this.state.formData[section][name], uploadInProgress: true };
    let sectionData = {...this.state.formData[section], [name]: target};
    this.setState({ formData: {...this.state.formData, [section]: sectionData } });
    const response = await ApiService.file({endpoint: 'media/avatar', options});
    const { secure_url = '' } = response.file;
    target = {...this.state.formData[section][name], value: secure_url, uploadInProgress: false };
    sectionData = {...this.state.formData[section], [name]: target};
    this.setState({ formData: {...this.state.formData, [section]: sectionData } });
  }
  
  handleInputData (event) {
    const { value, name, dataset, type, files } = event.target;
    const section = dataset.section;
    const isFile = type === 'file';
    if (isFile) {
      this.handleFileUpload(files, section, name);
      return;
    };
    
    const target = FormValidator.validateInput({...this.state.formData[section][name], value });
    const sectionData = {...this.state.formData[section], [name]: target};
    this.setState({ formData: {...this.state.formData, [section]: sectionData } });
  }
  
  resetValue ({ name, section }) {
    const target = {...this.state.formData[section][name], value: '' };
    const sectionData = {...this.state.formData[section], [name]: target};
    this.setState({ formData: {...this.state.formData, [section]: sectionData } });
  }

  goBack(){
    const { idPaciente = null } = this.props.match.params;
    const target = this.state.editMode && idPaciente? `/pacientes/${idPaciente}` : '/pacientes';
    this.props.history.push(target);
  }

  isFormValid(){
    const validatedFormData = FormValidator.validateForm(this.state.formData);
    const hasErrors = !FormValidator.isFormValid(validatedFormData);
    this.setState({ formData: { ...validatedFormData }, hasErrors });
    return !hasErrors;
  }

  processPatient (event) {
    event.preventDefault();
    if(!this.isFormValid()){
      AlertService.triggerAlert( { id: 'process-patient', type:'error', highlight: 'Ups!', text: 'Corrige los errores en el formulario' })
      return;
    }
    const patientModel = ParsePatient(this.state.formData);
    patientModel._id = this.props.match.params.idPaciente;
    this.props.addPatient(patientModel);
  }

  renderPatientHeader() {
    const { name, firstSurname, secondSurname, gender, avatar } = this.state.formData.patient;
    const fullName = name.value ? `${name.value} ${firstSurname.value} ${secondSurname.value}` : 'Nuevo paciente';
    const genderVal = gender.value;
    const avatarVal = avatar.value;
    return (
      <PatientDetailsHeader name={fullName} gender={genderVal} avatar={avatarVal}/>
    )
  }

  render() {
    const { newRecordStatus: { inProgress : newRecordInProgress = false, success : newRecordSuccess = false } = {} } = this.props;
    const { patientStatus: { inProgress : fetchPatientInProgress = false, success : fetchPatientSuccess = false } = {} } = this.props;
    const { editMode = false, patientDataPopulated = false } = this.state;
    if(!newRecordInProgress && newRecordSuccess) {
      const { newPatient } = this.props;
      AlertService.triggerAlert( { id: 'process-patient', type:'success', highlight: 'Excelente!', text: 'datos del paciente guardados' })
      return <Redirect to={ { pathname: `/pacientes/${newPatient._id}` } } />
    }
    if(editMode && !patientDataPopulated && fetchPatientSuccess) {
      const { patient } = this.props;
      const filledFormData = {
        patient: fillFormData(PatientFormData, patient),
        address: fillFormData(AddressFormData, patient.address),
        contact: fillFormData(ContactFormData, patient.contact),
        others: fillFormData(OthersFormData, patient.others),
      }
      this.setState({ formData: { ...filledFormData }, patientDataPopulated: true });
    }
    const title = editMode ? 'Actualizar paciente' : 'Alta de paciente';
    const btnTitle = editMode ? 'Actualizar' : 'Agregar';
    return (
      <article className="PatientAddPage">
        { newRecordInProgress || fetchPatientInProgress ? <LoadingLayer/> : null }
        <header className="PatientAddPage__header hidden-xs">
          <h1 className="theme-heading-medium">{title}</h1>
          {this.renderPatientHeader()}
        </header>
        <form className="PatientAddPage__form" autoComplete="off" encType="multipart/formdata" onSubmit={this.processPatient}>
          <FormGroupData title='Datos personales' data={this.state.formData.patient} section="patient" handleInputData={this.handleInputData} resetValue={this.resetValue}/>
          <FormGroupData title='Contacto' data={this.state.formData.contact} section="contact" handleInputData={this.handleInputData}/>
          <FormGroupData title='Dirección' data={this.state.formData.address} section="address" handleInputData={this.handleInputData}/>
          <FormGroupData title='Otros' data={this.state.formData.others} section="others" handleInputData={this.handleInputData}/>
          <ThemeButton className="PatientAddPage__saveBtn" title={btnTitle} onClick={this.processPatient}/>
          <ThemeButton className="PatientAddPage__cancelBtn" title="Cancelar" secondary={true} onClick={this.goBack}/>
        </form>
      </article>
    )
  }
}

function mapStateToProps (state) {
  const { newRecord, detail } = state.patients;
  return {
    newRecordStatus: newRecord.status,
    newPatient: newRecord.data, 
    patientStatus: detail.status,
    patient: detail.data
  }
}
function mapDispatchToProps (dispatch) {
  return {
      addPatient: patient => { dispatch(addPatient(patient)) },
      patientStatusRestore: () => { dispatch(fetchReset(FETCH_KEY_ADD_PATIENT)) },
      fetchPatient: (idPatient) => { dispatch(fetchPatient(idPatient)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientAddPage)
