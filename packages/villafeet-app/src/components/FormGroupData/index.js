import React from 'react';
import ThemeGroupTitle from './../ThemeGroupTitle';
import ThemeInput from './../ThemeInput';
import ThemeFileInput from './../ThemeFileInput';
import ThemeSelect from './../ThemeSelect';
import ThemeRadio from './../ThemeRadio';
import './FormGroupData.scss';

const createInputs = ({ fields = {}, section, fieldsOrder, handleInputData, resetValue } = {}) => {

  return [...fieldsOrder.values()].map( fieldKey => {
    const field = fields[fieldKey];
    const { type } = field;
    if(type==='select') {
      return <ThemeSelect
                key={fieldKey}
                data-section={section}
                name={fieldKey}
                onChange={handleInputData}
                {...field}
              />
    } else if(type==='radio') {
      return <ThemeRadio
                key={fieldKey}
                data-section={section}
                name={fieldKey}
                onChange={handleInputData}
                {...field}
              />
    } else if(type==='file') {
      //TODO: Update input file with diff style
      return <ThemeFileInput
              key={fieldKey}
              data-section={section}
              name={fieldKey}
              onChange={handleInputData}
              resetValue={resetValue}
              autoComplete='offAutocomplete'
              {...field}
            />
    } else {
      return <ThemeInput
                key={fieldKey}
                data-section={section}
                name={fieldKey}
                onChange={handleInputData}
                autoComplete='offAutocomplete'
                {...field}
              />
    }
  })
}

class FormGroupData extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        fieldsOrder: new Map()
      }
    }
    componentDidMount() {
      // Ensure render fields in order
      const fieldsOrder = new Map();
      const { data = {} } = this.props;
      for(const field in data) {
        fieldsOrder.set(field, field)
      }
      this.setState({ fieldsOrder });
    }
    render(){
      const { handleInputData, resetValue, data = {}, section, title } = this.props;
      const { fieldsOrder } = this.state;
      return(
        <React.Fragment>
            <ThemeGroupTitle className="FormGroupData__title" title={title}/>
            {createInputs({ fields: data, section, handleInputData, resetValue, fieldsOrder })}
        </React.Fragment>
      )
    }
}

export default FormGroupData;