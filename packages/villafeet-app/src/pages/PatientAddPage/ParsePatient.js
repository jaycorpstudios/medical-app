import formUtil from '../../utils/formUtils';
// TODO: Move this to a global parse util
function parseBirthday(stringDate) {
  return new Date(`${stringDate}T13:00:00`);
}

function extractBirthday(date) {
  const [stringDate = ''] = date.split('T');
  return stringDate;
}

const ParsePatient = (data) => {
  const patient = formUtil.extractValues(data.patient);
  patient.birthday = parseBirthday(patient.birthday);
  const PatientModel = {
    ...patient,
    contact: formUtil.extractValues(data.contact),
    address: formUtil.extractValues(data.address),
    others: formUtil.extractValues(data.others),
  };
  return PatientModel;
};

/*
 * Takes the formData Schema and adds values from data passed.
 */
export const fillFormData = (formData, data) => Object.keys(formData)
  .reduce((filledForm, formDataKey) => {
    const field = formData[formDataKey];
    let value = data && data[formDataKey];
    if (value) {
      if (formDataKey === 'birthday') {
        value = extractBirthday(value);
      }
    }
    filledForm[formDataKey] = { ...field, value };
    return filledForm;
  }, {});

export default ParsePatient;
