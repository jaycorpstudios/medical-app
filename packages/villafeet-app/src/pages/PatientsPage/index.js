import React from 'react';
import { connect } from 'react-redux';

import ThemeInput from  './../../components/ThemeInput';
import ThemeButton from  './../../components/ThemeButton';
import PatientsList from './../../components/PatientsList';

import { getPatients } from './../../actions';
import { filterBySearch } from '../../utils/filters';

import './PatientsPage.scss';

class PatientsPage extends React.Component {

  constructor(props){
    super(props);
    this.state = { filter: '' }
  }

  filterPatients(criteria = '', patients) {
    return [...patients].filter( filterBySearch(criteria, 'name') );
  }

  handleFilter(event) {
    const { value: filter } = event.target;
    this.setState({filter});
  }

  componentDidMount () {
    this.props.getPatients();
  }

  render(){
    return (
      <div className="PatientsPage">
        <div className="PatientsPage__header hidden-xs">
          <h1 className="theme-heading-large">Listado de pacientes</h1>
        </div>
        <ThemeInput className="PatientsPage__filter" type="search" icon="search" placeholder="Nombre del paciente" value={this.state.filter} onChange={this.handleFilter.bind(this)}/>
        <PatientsList patients={ this.filterPatients(this.state.filter, this.props.patients) }/>
        <div className="PatientsPage__mobile-cta visible-xs">
          <ThemeButton title="Agregar"/>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getPatients: () => dispatch(getPatients())
  }
}

function mapStateToProps (state, props) {
  return {
    patients: state.patients
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientsPage)
