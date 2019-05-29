function getAge(date) {
    const birthday = new Date(date);
    const age = new Date().getFullYear() - birthday.getFullYear();
    return age > 0 ? `${age} años` : '';
}

const AddressFields = {
    address1: { text: 'Dirección' },
    address2: { text: '' },
    city: { text: 'Ciudad' },
    state: {text: 'Estado'},
    district: { text: 'Municipio' },
    country: {text: 'País'},
    zip: { text: 'Código postal' },
    birthday: { text: 'Edad', parser: getAge }
}

const PersonalFields = {
    birthday: { text: 'Edad', parser: getAge },
    profession: { text: 'Profesión' }
}


const ContactFields = {
    email: { text: 'Correo' },
    phone: {text: 'Teléfono'},
}

function getFields(type) {
    switch(type){
        case 'address':
            return AddressFields
        case 'contact':
            return ContactFields
        case 'personal':
            return PersonalFields
        default:
            return {}
    }
}


export default function MapPatientData(data, type) {
    const dataToDisplay = [];
    const fields = getFields(type);
    Object.keys(data).forEach( key => {
      const field = fields[key];
      if(field){
        const value = field.parser ? field.parser(data[key]) : data[key];
        dataToDisplay.push({ field: field.text, value });
      }
    })
    return dataToDisplay;
}