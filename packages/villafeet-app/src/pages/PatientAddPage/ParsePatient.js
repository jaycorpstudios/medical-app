//Create a model to be send to firestore
function parseBirthday(stringDate){
    return new Date(`${stringDate} 13:00:00`);
}

const ParsePatient = (data) => {
    const personal = {},
          contact = {},
          medicalHistory = {};

    const today = new Date();

    data.personal.forEach( field => {
        if(field.name === 'correo' || field.name === 'telefono'){
            contact[field.name] = field.value;
        }
        const value = field.name === 'fechaNacimiento' ? parseBirthday(field.value) : field.value;
        personal[field.name] = value;
    });

    if(data.medicalHistory){
        data.medicalHistory.forEach( field => {
            medicalHistory[field.name] = field.value;
        });
    }

    const PatientModel = {
        personal,
        contact,
        medicalHistory,
        ultimaVisita: today,
        fechaCreado: today,
        avatarUrl: ''
    };
    return PatientModel;
}

export default ParsePatient;