import React from 'react';
import ThemeGroupTitle from './../ThemeGroupTitle';
import ThemeInput from './../ThemeInput';
import ThemeSelect from './../ThemeSelect';
import ThemeRadio from './../ThemeRadio';
import './FormGroupData.scss';

const createInputs = (fields, section, handleInputData) => {
  return fields.map( field => {
    const { id, name, type, value='', label, options } = field;
    if(type==='select') {
      return <ThemeSelect key={id} data-section={section} name={name} value={value} label={label} options={options} onChange={handleInputData}/>
    } else if(type==='radio') {
      return <ThemeRadio key={id} data-section={section} name={name} value={value} label={label} options={options} onChange={handleInputData}/>
    } else {
      return <ThemeInput key={id} data-section={section} name={name} value={value} type={type} label={label} onChange={handleInputData} autoComplete='offAutocomplete'/>
    }
  })
}

const FormGroupData = props => {
    const { handleInputData, data=[], section, title } = props;
    return(
      <React.Fragment>
          <ThemeGroupTitle className="FormGroupData__title" title={title}/>
          { createInputs(data, section, handleInputData) }
      </React.Fragment>
    )
}

export default FormGroupData;