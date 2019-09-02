import React from 'react';
import ThemeGroupTitle from './../ThemeGroupTitle';
import ThemeInput from './../ThemeInput';
import ThemeSelect from './../ThemeSelect';
import ThemeRadio from './../ThemeRadio';
import './FormGroupData.scss';

const createInputs = (fields = {}, section, handleInputData) => {
  return Object.keys(fields).map( fieldKey => {
    const field = fields[fieldKey];
    const { type, value='', label, options, validations, hasError, errorMessage } = field;
    if(type==='select') {
      return <ThemeSelect
                key={fieldKey}
                data-section={section}
                name={fieldKey}
                value={value}
                label={label}
                options={options}
                onChange={handleInputData}
                validations={validations}
              />
    } else if(type==='radio') {
      return <ThemeRadio
                key={fieldKey}
                data-section={section}
                name={fieldKey}
                value={value}
                label={label}
                options={options}
                onChange={handleInputData}
                validations={validations}
              />
    } else {
      return <ThemeInput
                key={fieldKey}
                data-section={section}
                name={fieldKey}
                value={value}
                type={type}
                label={label}
                onChange={handleInputData}
                autoComplete='offAutocomplete'
                validations={validations}
                hasError={hasError}
                errorMessage={errorMessage}
              />
    }
  })
}

const FormGroupData = props => {
    const { handleInputData, data = [], section, title } = props;
    return(
      <React.Fragment>
          <ThemeGroupTitle className="FormGroupData__title" title={title}/>
          { createInputs(data, section, handleInputData) }
      </React.Fragment>
    )
}

export default FormGroupData;