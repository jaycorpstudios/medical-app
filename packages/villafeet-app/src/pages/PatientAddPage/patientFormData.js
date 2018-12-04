import Estados from './../../staticData/statesOfMexico'

const PatientFormData = {
    personal: [
      { id: 1, name:'nombre', label:'Nombre', value: '', type: 'text' },
      { id: 2, name:'apellidoPaterno', label:'Apellido paterno', value: '', type: 'text' },
      { id: 3, name:'apellidoMaterno', label:'Apellido materno', value: '', type: 'text' },
      {
        id: 4, name:'sexo', label:'Sexo:', value: 'hombre', type: 'radio',
        options: [{value:'hombre', text:'Hombre'},{value:'mujer', text:'Mujer'}]
      },
      { id: 5, name:'correo', label:'Correo', value: '', type: 'email' },
      { id: 6, name:'telefono', label:'Telefono', value: '', type: 'tel' },
      { id: 7, name:'fechaNacimiento',label:'Fecha de nacimiento', value: '1980-01-01', type: 'date' },
      { id: 8, name:'peso', value: '', label:'Peso', type: 'number' },
      { id: 9, name:'talla', value: '', label:'Talla', type: 'number' },
      { id: 10, name:'direccion', value: '', label:'Calle y número (opcional)', type: 'text' },
      {
        id: 11, name:'estado', value: 'jalisco', label:'Estado', type: 'select',
        options: [...Estados]
      },
      { id: 12, name:'ocupacion', value: '', label:'Ocupación', type: 'text' },
      {
        id: 13, name:'ejercicio', value: 'medio', label:'Nivel de ejercicio', type: 'select',
        options: [ {value:'alto', text:'Alto'}, {value:'medio', text:'Medio'}, {value:'bajo', text:'Bajo'} ]
      }
    ]
  }

export default PatientFormData;