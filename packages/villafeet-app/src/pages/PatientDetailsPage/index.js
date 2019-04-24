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
import MapPatientData from './mapPatientData';

import './PatientDetailsPage.scss';

function mapPersonalData(personal) {
  const personalData = [];

  function getAge(time) {
    const birthday = time.toDate();
    const age = new Date().getFullYear() - birthday.getFullYear();
    return `${age} años`;
  }

  const fields = {
    direccion: { text: 'Dirección' },
    estado: {text: 'Estado'},
    municipio: { text: 'Municipio' },
    ocupacion: { text: 'Ocupación' },
    talla: { text: 'Talla' },
    fechaNacimiento: {text: 'Edad', parser: getAge }
  }
  Object.keys(personal).forEach( key => {
    const field = fields[key];
    if(field){
      const value = field.parser ? field.parser(personal[key]) : personal[key];
      personalData.push({ field: field.text, value });
    }
  })
  return personalData;
}

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

    const { avatarUrl, ultimaVisita, personal = {} } = patient;
    const { nombre = '', apellidoPaterno = '', apellidoMaterno = '', sexo:gender } = personal;
    const nombreCompleto = `${nombre} ${apellidoPaterno} ${apellidoMaterno}`;

    const personalData = MapPatientData(personal, 'personal');
    const contactData = MapPatientData(personal, 'contact');


    if(requesting) {
      return <LoadingState/>
    }

    return (
      <article className="PatientDetailsPage">
        <section className="PatientDetailsPage__back hidden-xs">
          <Link to={'/pacientes'}><TernaryButton title='Regresar' negative={true} icon='back'/></Link>
        </section>
        <PatientDetailsHeader nombre={nombreCompleto} gender={gender} avatarUrl={avatarUrl} ultimaVisita={ultimaVisita} />
        <PatientSectionTabs/>
        <section className="PatientDetailsPage__details">
          <PatientDetailsGroup title='Datos personales' data={personalData}/>
          <PatientDetailsGroup title='Contacto' data={contactData}/>
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
