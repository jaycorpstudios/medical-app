//Create a model to be send to firestore
function parseBirthday(stringDate){
    return new Date(`${stringDate}T13:00:00`);
}

function extractBirthday(date){
    const [ stringDate = '' ] = date.split('T');
    return stringDate;
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
        address: mapValuesToObj(data.address),
        others: mapValuesToObj(data.others)
    };
    return PatientModel;
}

export const fillFormData = (formData, data) => {
    return [...formData].map( field => {
      const { name } = field;
      if(data && data[name]) {
        let value = data[name];
        if(name === 'birthday') {
            value = extractBirthday(value);
        }
        field = { ...field, value }
      }
      return field;
    });
  }

export default ParsePatient;