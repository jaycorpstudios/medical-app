//Create a model to be send to firestore
function parseBirthday(stringDate){
    return new Date(`${stringDate}T13:00:00`);
}

const mapValuesToObj = (data = []) => {
    let mappedObject = {};
    data.forEach( field => mappedObject[field.name] = field.value);
    return mappedObject;
}

const ParsePatient = (data) => {
    let patient = mapValuesToObj(data.patient);
    patient.birthday = parseBirthday(patient.birthday);

    const PatientModel = {
        ...patient,
        contact: mapValuesToObj(data.contact),
        address: mapValuesToObj(data.address)
    };
    return PatientModel;
}

export default ParsePatient;