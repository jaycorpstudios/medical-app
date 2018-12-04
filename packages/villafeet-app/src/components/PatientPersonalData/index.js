import React from 'react';
import ThemeGroupTitle from './../ThemeGroupTitle';
import ThemeInput from './../ThemeInput';
import ThemeSelect from './../ThemeSelect';
import ThemeRadio from './../ThemeRadio';
import './PatientPersonalData.scss';

const createInputs = (fields, handleInputData) => {
  return fields.map( field => {
    const { id, name, type, value='', label, options } = field;
    if(type==='select') {
      return <ThemeSelect key={id} name={name} value={value} label={label} options={options} onChange={handleInputData}/>
    } else if(type==='radio') {
      return <ThemeRadio key={id} name={name} value={value} label={label} options={options} onChange={handleInputData}/>
    } else {
      return <ThemeInput key={id} name={name} value={value} type={type} label={label} onChange={handleInputData} autoComplete='offAutocomplete'/>
    }
  })
}

const PatientDetailsGroup = props => {
    const { handleInputData, data=[] } = props;
    return(
      <React.Fragment>
          <ThemeGroupTitle className="PatientDetailsGroup__title" title='Datos personales'/>
          { createInputs(data, handleInputData) }
        </React.Fragment>
    )
}

export default PatientDetailsGroup;