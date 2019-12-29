import {
  isEmpty, isNumeric, isEmail, isISO8601,
} from 'validator';

const availableValidations = {
  required: {
    validate: (value) => isEmpty(value.trim()),
    errorMessage: 'Este campo es requerido',
  },
  number: {
    validate: (value) => !isNumeric(value),
    errorMessage: 'Sólo se aceptán números',
  },
  email: {
    validate: (value) => !isEmail(value),
    errorMessage: 'Ingresa un correo válido',
  },
  date: {
    validate: (value) => !isISO8601(value),
    errorMessage: 'Ingresa una fecha válida',
  },
};

class FormValidator {
  constructor(validations) {
    this.availableValidations = validations;
  }

  validateInput(data) {
    const input = { ...data };
    const { validations = [] } = input;
    validations.some((validation) => {
      const validator = this.availableValidations[validation];
      if (validator) {
        const { value = '' } = input;
        const hasError = validator.validate(value);
        input.hasError = hasError;
        input.errorMessage = hasError ? validator.errorMessage : '';
      }
      return input.hasError;
    });
    return input;
  }

  validateFormSection(formSection) {
    return Object.keys(formSection).reduce((validatedFormSection, inputKey) => {
      validatedFormSection[inputKey] = this.validateInput(formSection[inputKey]);
      return validatedFormSection;
    }, {});
  }

  isFormSectionValid(formSection) {
    return !Object.keys(formSection).some((inputKey) => formSection[inputKey].hasError);
  }

  validateForm(form) {
    return Object.keys(form).reduce((validatedForm, sectionKey) => {
      validatedForm[sectionKey] = this.validateFormSection(form[sectionKey]);
      return validatedForm;
    }, {});
  }

  isFormValid(formData) {
    return !Object.keys(formData).some((formSectionKey) => {
      const formSection = formData[formSectionKey];
      return Object.keys(formSection).some((inputKey) => formSection[inputKey].hasError);
    });
  }
}

export default new FormValidator(availableValidations);
