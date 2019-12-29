import Estados from '../../staticData/statesOfMexico';

const states = Estados.map(({ id, text }) => ({ id, text, value: text }));

export const PatientFormData = {
  name: {
    label: 'Nombre',
    value: '',
    type: 'text',
    validations: ['required'],
  },
  firstSurname: {
    label: 'Apellido paterno',
    value: '',
    type: 'text',
    validations: ['required'],
  },
  secondSurname: {
    label: 'Apellido materno',
    value: '',
    type: 'text',
  },
  gender: {
    label: 'Sexo:',
    value: 'male',
    type: 'radio',
    options: [{ value: 'male', text: 'Hombre' }, { value: 'female', text: 'Mujer' }],
  },
  avatar: {
    label: 'Foto de perfil',
    type: 'file',
    value: '',
    uploadInProgress: false,
  },
  birthday: {
    label: 'Fecha de nacimiento',
    value: '1980-01-01',
    type: 'date',
    validations: ['required', 'date'],
  },
  // TODO: Move the rest to medical
  peso: {
    value: '',
    label: 'Peso',
    type: 'number',
    validations: ['number'],
  },
  talla: {
    value: '',
    label: 'Talla',
    type: 'number',
    validations: ['number'],
  },
  ejercicio: {
    value: 'medio',
    label: 'Nivel de ejercicio',
    type: 'select',
    options: [{ value: 'alto', text: 'Alto' }, { value: 'medio', text: 'Medio' }, { value: 'bajo', text: 'Bajo' }],
  },
};

export const ContactFormData = {
  email: {
    label: 'Correo',
    value: '',
    type: 'email',
    validations: ['required', 'email'],
  },
  phone: {
    label: 'Telefono',
    value: '',
    type: 'tel',
  },
};

export const OthersFormData = {
  profession: {
    value: '',
    label: 'Ocupación',
    type: 'text',
  },
};

export const AddressFormData = {
  address1: {
    value: '',
    label: 'Calle y número (opcional)',
    type: 'text',
  },
  address2: {
    value: '',
    label: 'Interior, piso, departamento (opcional)',
    type: 'text',
  },
  city: {
    value: '',
    label: 'Municipio (opcional)',
    type: 'text',
  },
  state: {
    value: 'Jalisco',
    label: 'Estado',
    type: 'select',
    options: [...states],
  },
  zip: {
    value: '',
    label: 'Código postal (opcional)',
    type: 'text',
  },
};
