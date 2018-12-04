import React from 'react';

import ThemeButton from  './../../components/ThemeButton';
import PatientPersonalData from './../../components/PatientPersonalData';
import PatientFormData from './patientFormData';

import './PatientAddPage.scss';

class PatientAddPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hasErrors: false,
      errorMessage: ''
    }
    this.handleInputData = this.handleInputData.bind(this);
    this.processPatient = this.processPatient.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentWillMount(){
    this.setState(PatientFormData);
  }

  getDataFromField(name){
    return this.state.personal.find( input => input.name === name );
  }

  handleInputData (event) {
    const { value, name } = event.target;
    const target = {...this.getDataFromField(name), value };
    const personal = [...this.state.personal.filter( item => item.name !== name ), target].sort( (a,b) => a.id - b.id );
    this.setState({personal});
  }

  goBack(){
    this.props.history.push('/pacientes')
  }

  processPatient (event) {
    event.preventDefault();
    if(this.state.hasErrors){
      return
    }
    const filteredPersonalData = this.state.personal.map( input => {
      const {name, value=''} = input;
      return { name, value }
    });
    //TODO: Implement data saving
}

  render(){

    return (
      <article className="PatientAddPage">
        <header className="PatientAddPage__header hidden-xs">
          <h1 className="theme-heading-large">Alta de paciente</h1>
        </header>
        <form className="PatientAddPage__form" autoComplete="off" onSubmit={this.processPatient}>
          <PatientPersonalData data={this.state.personal} handleInputData={this.handleInputData}/>
          <ThemeButton className="PatientAddPage__saveBtn" title="Agregar" onClick={this.processPatient}/>
          <ThemeButton className="PatientAddPage__cancelBtn" title="Cancelar" secondary={true} onClick={this.goBack}/>
        </form>
      </article>
    )
  }
}

//export default connect(null, null)(PatientAddPage)
export default PatientAddPage
