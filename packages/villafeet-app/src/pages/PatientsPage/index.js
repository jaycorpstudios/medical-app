import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchReset, fetchPatients } from '../../actions';
import { FETCH_KEY_ADD_PATIENT } from '../../actions/types';
import ThemeInput from '../../components/ThemeInput';
import ThemeButton from '../../components/ThemeButton';
import TernaryButton from '../../components/TernaryButton';
import PatientsList from '../../components/PatientsList';

import { filterByName } from '../../utils/filters';

import './PatientsPage.scss';

class PatientsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filter: '' };
  }

  componentWillMount() {
    this.props.patientRecordRestore();
    this.props.fetchPatients();
  }

  filterPatients(criteria = '', patients) {
    return [...patients].filter(filterByName(criteria, 'name'));
  }

  handleFilter(event) {
    const { value: filter } = event.target;
    this.setState({ filter });
  }

  render() {
    const { patients = [], status: { inProgress = true } } = this.props;
    const { filter } = this.state;

    return (
      <div className="PatientsPage">
        <div className="PatientsPage__header hidden-xs">
          <h1 className="theme-heading-large">Listado de pacientes</h1>
          <Link to="/pacientes/agregar"><TernaryButton title="Agregar paciente" icon="plus" /></Link>
        </div>
        <ThemeInput className="PatientsPage__filter no-highlight" type="search" icon="search" placeholder="Nombre del paciente" value={this.state.filter} onChange={this.handleFilter.bind(this)} />
        <PatientsList patients={this.filterPatients(filter, patients)} loading={inProgress} />
        <div className="PatientsPage__mobile-cta visible-xs">
          <Link to="/pacientes/agregar"><ThemeButton title="Agregar" /></Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { list } = state.patients;
  return {
    patients: list.data.patients,
    status: list.status,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    patientRecordRestore: () => { dispatch(fetchReset(FETCH_KEY_ADD_PATIENT)); },
    fetchPatients: () => { dispatch(fetchPatients()); },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(PatientsPage);
