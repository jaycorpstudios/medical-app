function getAge(date) {
  const birthday = new Date(date);
  const ageDifMs = new Date().getTime() - birthday.getTime();
  const ageDate = new Date(ageDifMs);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);
  return age > 0 ? `${age} años` : '';
}

const AddressFields = {
  address1: { text: 'Calle' },
  address2: { text: 'Interior, piso' },
  city: { text: 'Ciudad' },
  state: { text: 'Estado' },
  district: { text: 'Municipio' },
  country: { text: 'País' },
  zip: { text: 'Código postal' },
  birthday: { text: 'Edad', parser: getAge },
};

const PersonalFields = {
  birthday: { text: 'Edad', parser: getAge },
  profession: { text: 'Profesión' },
};


const ContactFields = {
  email: { text: 'Correo' },
  phone: { text: 'Teléfono' },
};

function getFields(type) {
  switch (type) {
    case 'address':
      return AddressFields;
    case 'contact':
      return ContactFields;
    case 'personal':
      return PersonalFields;
    default:
      return {};
  }
}


export default function MapPatientData(data, type) {
  const dataToDisplay = [];
  const fields = getFields(type);
  Object.keys(data).forEach((key) => {
    const field = fields[key];
    if (field) {
      const value = field.parser ? field.parser(data[key]) : data[key];
      dataToDisplay.push({ field: field.text, value });
    }
  });
  return dataToDisplay;
}
