import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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

const PatientsPage = ({
  patients, status, patientRecordRestore, dispatchFetchPatients,
}) => {
  const [filter, setFilter] = useState('');

  useEffect(() => {
    patientRecordRestore();
    dispatchFetchPatients();
  }, []);

  const filterPatients = (criteria = '', currentPatients) => [...currentPatients].filter(filterByName(criteria, 'name'));

  const handleFilter = (event) => {
    const { value } = event.target;
    setFilter(value);
  };
  const { inProgress = true } = status;

  return (
    <div className="PatientsPage">
      <div className="PatientsPage__header hidden-xs">
        <h1 className="theme-heading-large">Listado de pacientes</h1>
        <Link to="/pacientes/agregar"><TernaryButton title="Agregar paciente" icon="plus" /></Link>
      </div>
      <ThemeInput
        className="PatientsPage__filter no-highlight"
        type="search"
        icon="search"
        placeholder="Nombre del paciente"
        value={filter}
        onChange={handleFilter}
      />
      <PatientsList patients={filterPatients(filter, patients)} loading={inProgress} />
      <div className="PatientsPage__mobile-cta visible-xs">
        <Link to="/pacientes/agregar"><ThemeButton title="Agregar" /></Link>
      </div>
    </div>
  );
};

PatientsPage.propTypes = {
  patients: PropTypes.arrayOf(PropTypes.object),
  status: PropTypes.shape({
    inProgress: PropTypes.bool,
    success: PropTypes.bool,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
  }).isRequired,
  patientRecordRestore: PropTypes.func.isRequired,
  dispatchFetchPatients: PropTypes.func.isRequired,
};

PatientsPage.defaultProps = {
  patients: [],
};

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
    dispatchFetchPatients: () => { dispatch(fetchPatients()); },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(PatientsPage);
