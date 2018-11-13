import { GET_PATIENTS } from '../actions/types'

const patients = [
  {id: 4, name: 'Angélica Moreno', lastVisit: 'Jueves 25 de Octubre de 2018' },
  {id: 1, name: 'Karla DoSantos', lastVisit: 'Martes 23 de Octubre de 2018' },
  {id: 2, name: 'Daniela Vargas', lastVisit: 'Domingo 11 de Noviembre de 2018' },
  {id: 3, name: 'Karla DoSantos', lastVisit: 'Martes 23 de Octubre de 2018' },
  {id: 5, name: 'Karla DoSantos', lastVisit: 'Martes 23 de Octubre de 2018' },
  {id: 6, name: 'Karla DoSantos', lastVisit: 'Martes 23 de Octubre de 2018' },
  {id: 7, name: 'Karla DoSantos', lastVisit: 'Martes 23 de Octubre de 2018' },
  {id: 8, name: 'Karla DoSantos', lastVisit: 'Martes 23 de Octubre de 2018' },
  {id: 9, name: 'Karla DoSantos', lastVisit: 'Martes 23 de Octubre de 2018' },
  {id: 10, name: 'Karla DoSantos', lastVisit: 'Martes 23 de Octubre de 2018' },
  {id: 11, name: 'Karla DoSantos', lastVisit: 'Martes 23 de Octubre de 2018' },
  {id: 12, name: 'Karla DoSantos', lastVisit: 'Martes 23 de Octubre de 2018' },
  {id: 13, name: 'Karla DoSantos', lastVisit: 'Martes 23 de Octubre de 2018' },
  {id: 14, name: 'Karla DoSantos', lastVisit: 'Martes 23 de Octubre de 2018' },
  {id: 15, name: 'Karla DoSantos', lastVisit: 'Martes 23 de Octubre de 2018' },
  {id: 16, name: 'Karla DoSantos', lastVisit: 'Martes 23 de Octubre de 2018' }
]

export function getPatients (state = patients, action) {
  return [...patients];
}

export default function PatientsReducer (state = [], action) {
  switch (action.type) {
    case GET_PATIENTS:
      return getPatients();
    default:
      return state
  }
}
