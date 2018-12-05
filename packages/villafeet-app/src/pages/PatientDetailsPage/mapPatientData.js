function getAge(timeStamp) {
    const birthday = timeStamp.toDate();
    const age = new Date().getFullYear() - birthday.getFullYear();
    return `${age} años`;
}

const PersonalFields = {
    direccion: { text: 'Dirección' },
    estado: {text: 'Estado'},
    municipio: { text: 'Municipio' },
    ocupacion: { text: 'Ocupación' },
    talla: { text: 'Talla' },
    fechaNacimiento: { text: 'Edad', parser: getAge }
}

const ContactFields = {
    correo: { text: 'Correo' },
    telefono: {text: 'Teléfono'},
}

function getFields(type) {
    switch(type){
        case 'personal':
            return PersonalFields
        case 'contact':
            return ContactFields
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