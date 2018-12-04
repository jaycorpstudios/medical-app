import React from 'react';
import './ThemeSelect.scss';

export default class ThemeSelect extends React.Component {

    renderOptions(options) {
        return options.map( (option, index) => <option key={index} value={option.value}>{option.text}</option> )
    }

    render() {
        const {className = '', name, value, options, label, ...other} = this.props;
        const classes = `ThemeSelect theme-body-regular  ${className}`;

        return (
            <div className={classes}>
                <label className='ThemeSelect__label' htmlFor={other.name}>{label}</label>
                <select className='ThemeSelect__select theme-body-regular' name={name} value={value} {...other}>
                    {this.renderOptions(options)}
                </select>
            </div>

        )
    }
}

ThemeSelect.defaultProps = {
    options: []
}