import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { patientRecordRestore } from './../../actions';

import ThemeInput from  './../../components/ThemeInput';
import ThemeButton from  './../../components/ThemeButton';
import TernaryButton from './../../components/TernaryButton';
import PatientsList from './../../components/PatientsList';

import { filterByName } from '../../utils/filters';

import './PatientsPage.scss';

class PatientsPage extends React.Component {

  constructor(props){
    super(props);
    this.state = { filter: '' }
  }

  componentWillMount() {
    this.props.patientRecordRestore();
  }

  filterPatients(criteria = '', patients) {
    return [...patients].filter( filterByName(criteria, 'nombre') );
  }

  handleFilter(event) {
    const { value: filter } = event.target;
    this.setState({filter});
  }

  render(){
    const { patients = [], status:{requesting:{pacientes: loading } } = true } = this.props;

    return (
      <div className="PatientsPage">
        <div className="PatientsPage__header hidden-xs">
          <h1 className="theme-heading-large">Listado de pacientes</h1>
          <Link to={'/pacientes/agregar'}><TernaryButton title='Agregar paciente' icon='plus'/></Link>
        </div>
        <ThemeInput className="PatientsPage__filter no-highlight" type="search" icon="search" placeholder="Nombre del paciente" value={this.state.filter} onChange={this.handleFilter.bind(this)}/>
        <PatientsList patients={ this.filterPatients(this.state.filter, patients)} loading={loading}/>
        <div className="PatientsPage__mobile-cta visible-xs">
        <Link to={'/pacientes/agregar'}><ThemeButton title="Agregar"/></Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    patients: state.firestore.ordered.pacientes,
    status: state.firestore.status
  }
}

function mapDispatchToProps (dispatch) {
  return {
      patientRecordRestore: () => { dispatch(patientRecordRestore()) }
  }
}

function mapFirebase () {
   return ['pacientes']
}

export default compose(firestoreConnect(mapFirebase), connect(mapStateToProps, mapDispatchToProps))(PatientsPage)
