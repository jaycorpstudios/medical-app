import { useState } from 'react';
import FormValidator from './../services/FormValidator';

const useFormData = (initialState = {}) => {
  const [ form, updateForm ] = useState(initialState);

  const handleInputData = (event) => {
    const { value, name } = event.target;
    const target = FormValidator.validateInput({ ...form[name], value });
    updateForm({ ...form, [name]: target });
  }
  
  const isFormValid = () => {
    const validatedFormData = FormValidator.validateFormSection(form);
    const hasErrors = !FormValidator.isFormSectionValid(validatedFormData);
    updateForm({ ...validatedFormData });
    return !hasErrors;
  }

  return {
    form,
    handleInputData,
    isFormValid,
  }
}

export default useFormData;