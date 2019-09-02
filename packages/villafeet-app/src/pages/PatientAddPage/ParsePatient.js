
//TODO: Move this to a global parse util
function parseBirthday(stringDate) {
    return new Date(`${stringDate}T13:00:00`);
}

function extractBirthday(date){
    const [ stringDate = '' ] = date.split('T');
    return stringDate;
}

const extractValues = (data = {}) => {
    return Object.keys(data).reduce((model, key)=>{
        model[key] = data[key].value;
        return model;
    },{});
}

const ParsePatient = (data) => {
    let patient = extractValues(data.patient);
    patient.birthday = parseBirthday(patient.birthday);
    const PatientModel = {
        ...patient,
        contact: extractValues(data.contact),
        address: extractValues(data.address),
        others: extractValues(data.others)
    };
    return PatientModel;
}

/*
 * Takes the formData Schema and adds values from data passed.
 */
export const fillFormData = (formData, data) => {
    return Object.keys(formData).reduce( (filledForm, formDataKey) => {
      const field = formData[formDataKey];
      let value = data && data[formDataKey];
      if(value) {
        if(formDataKey === 'birthday') {
            value = extractBirthday(value);
        }
        filledForm[formDataKey] = { ...field, value };
      }
      return filledForm;
    }, {});
  }

export default ParsePatient;