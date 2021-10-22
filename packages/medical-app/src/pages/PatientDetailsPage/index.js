import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPatient, fetchReset, removePatient } from '../../actions';
import { FETCH_KEY_GET_PATIENT } from '../../actions/types';
import useModalState from '../../hooks/useModalState';
import LoadingState from '../../components/LoadingState';
import PatientDetailsHeader from '../../components/PatientDetails/PatientDetailsHeader';
import PatientSectionTabs from '../../components/PatientDetails/PatientSectionTabs';
import PatientDetailsGroup from '../../components/PatientDetails/PatientDetailsGroup';
import ThemeButtonPrimary from '../../components/ThemeButtonPrimary';
import ThemeButtonDefault from '../../components/ThemeButtonDefault';
import DropDown from '../../components/DropDown';
import MapPatientData from './mapPatientData';
import ModalConfirm from '../../components/ModalConfirm';

import './PatientDetailsPage.scss';

const PatientDetailsPage = (props) => {
  const { shouldDisplayModal, openModal, setNodeRef } = useModalState(false);
  const [random] = useState(Math.random());

  const refresh = () => {
    props.history.push({ search: `?some=${Math.random()}` });
  };

  useEffect(() => {
    const { match, dispatchFetchPatient } = props;
    const { idPaciente = '' } = match.params;
    dispatchFetchPatient(idPaciente);
    return () => {
      const { patientStatusRestore } = props;
      patientStatusRestore();
    };
  }, []);

  const onRemovePatient = () => {
    openModal(true);
  };

  const onCancelModal = () => {
    openModal(false);
  };

  const onConfirmModal = () => {
    const { history, match, dispatchRemovePatient } = props;
    const { idPaciente = '' } = match.params;
    dispatchRemovePatient(idPaciente);
    openModal(false);
    history.push('/pacientes');
  };

  const editPatient = (_id) => () => {
    const { history } = props;
    history.push(`/pacientes/editar/${_id}`);
  };

  const {
    patient = {},
    status: { inProgress = true } = {},
  } = props;

  const {
    _id = null, name = '', firstSurname = '', secondSurname = '', gender, avatar, lastVisit, contact = {}, address = {}, others = {},
  } = patient;
  const fullName = `${name} ${firstSurname} ${secondSurname}`;
  patient.profession = others.profession;

  const contactData = MapPatientData(contact, 'contact');
  const addressData = MapPatientData(address, 'address');
  const personalData = MapPatientData(patient, 'personal');

  if (inProgress) return <LoadingState />;

  const dropDownOptions = [
    { title: 'Editar paciente', icon: 'edit', onClick: editPatient(_id) },
    { title: 'Borrar paciente', icon: 'delete_outline', onClick: onRemovePatient },
  ];

  return (
    <article className="PatientDetailsPage">
      <section className="PatientDetailsPage__back hidden-xs">
        <Link to="/pacientes"><ThemeButtonDefault title="Regresar" icon="arrow_back" noShadow /></Link>
        <h1>
          Random:
          {random}
        </h1>
        <button onClick={refresh}>Refresh</button>
      </section>
      <PatientDetailsHeader name={fullName} gender={gender} avatar={avatar} lastVisit={lastVisit}>
        <ThemeButtonPrimary title="Iniciar consulta" icon="play_arrow" className="hidden-xs" />
        <DropDown options={dropDownOptions} icon="more_horiz" />
      </PatientDetailsHeader>
      <PatientSectionTabs />
      <section className="PatientDetailsPage__details">
        <PatientDetailsGroup title="Datos personales" data={personalData} />
        <PatientDetailsGroup title="Contacto" data={contactData} />
        <PatientDetailsGroup title="Dirección" data={addressData} />
      </section>
      <ModalConfirm
        open={shouldDisplayModal}
        title="¿Estas seguro que quieres eliminar al paciente?"
        description="Esta acción no puede deshacerse"
        confirmTitle="Borrar"
        setNodeRef={setNodeRef}
        onConfirm={onConfirmModal}
        onCancel={onCancelModal}
      />
    </article>
  );
};

function mapStateToProps(state) {
  const { detail } = state.patients;
  return {
    patient: detail.data,
    status: detail.status,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    patientStatusRestore: () => { dispatch(fetchReset(FETCH_KEY_GET_PATIENT)); },
    dispatchFetchPatient: (idPatient) => { dispatch(fetchPatient(idPatient)); },
    dispatchRemovePatient: (idPatient) => { dispatch(removePatient(idPatient)); },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetailsPage);
