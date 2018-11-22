import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import ThemeInput from  './../../components/ThemeInput';
import ThemeButton from  './../../components/ThemeButton';
import PatientsList from './../../components/PatientsList';

import { filterBySearch } from '../../utils/filters';

import './PatientsPage.scss';

class PatientsPage extends React.Component {

  constructor(props){
    super(props);
    this.state = { filter: '' }
  }

  filterPatients(criteria = '', patients) {
    return [...patients].filter( filterBySearch(criteria, 'nombre') );
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
        </div>
        <ThemeInput className="PatientsPage__filter" type="search" icon="search" placeholder="Nombre del paciente" value={this.state.filter} onChange={this.handleFilter.bind(this)}/>
        <PatientsList patients={ this.filterPatients(this.state.filter, patients)} loading={loading}/>
        <div className="PatientsPage__mobile-cta visible-xs">
          <ThemeButton title="Agregar"/>
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

function mapFirebase () {
   return ['pacientes']
}

export default compose(firestoreConnect(mapFirebase), connect(mapStateToProps, null))(PatientsPage)
