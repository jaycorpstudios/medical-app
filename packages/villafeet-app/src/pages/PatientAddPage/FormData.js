import Estados from './../../staticData/statesOfMexico';
const states = Estados.map( ({id, text}) => {
                return {id, text, value: text }
              });

export const PatientFormData = [
      { id: 1, name:'name', label:'Nombre', value: '', type: 'text' },
      { id: 2, name:'firstSurname', label:'Apellido paterno', value: '', type: 'text' },
      { id: 3, name:'secondSurname', label:'Apellido materno', value: '', type: 'text' },
      {
        id: 4, name:'gender', label:'Sexo:', value: 'hombre', type: 'radio',
        options: [{value:'male', text:'Hombre'},{value:'female', text:'Mujer'}]
      },
      { id: 5, name:'birthday',label:'Fecha de nacimiento', value: '1980-01-01', type: 'date' },
      { id: 6, name:'profession', value: '', label:'Ocupación', type: 'text' },
      
      //TODO: Move the rest to medical
      { id: 7, name:'peso', value: '', label:'Peso', type: 'number' },
      { id: 8, name:'talla', value: '', label:'Talla', type: 'number' },
      {
        id: 9, name:'ejercicio', value: 'medio', label:'Nivel de ejercicio', type: 'select',
        options: [ {value:'alto', text:'Alto'}, {value:'medio', text:'Medio'}, {value:'bajo', text:'Bajo'} ]
      }
    ];

export const ContactFormData = [
  { id: 1, name:'email', label:'Correo', value: '', type: 'email' },
  { id: 2, name:'phone', label:'Telefono', value: '', type: 'tel' },
]

export const AddressFormData = [
  { id: 1, name:'address1', value: '', label:'Calle y número (opcional)', type: 'text' },
  { id: 2, name:'address2', value: '', label:'Interior, piso, departamento (opcional)', type: 'text' },
  { id: 3, name:'city', value: '', label:'Municipio (opcional)', type: 'text' },
  {
    id: 4, name:'state', value: 'Jalisco', label:'Estado', type: 'select',
    options: [...states]
  },
  { id: 5, name:'zip', value: '', label:'Código postal', type: 'text' },
]