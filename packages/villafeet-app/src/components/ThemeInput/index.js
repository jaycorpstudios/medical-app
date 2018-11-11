import React from 'react';
import './ThemeInput.scss';

export default class ThemeInput extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            value: '',
            isEmpty: true
        }
        this.handleData = this.handleData.bind(this);
    }

    handleData (event) {
        const { value } = event.target;
        this.setState({value, isEmpty: !value});
    }

    render() {

        const {icon, className, negative, ...other} = this.props;
        const negativeClass = negative ? '--negative' : '';
        const inputClass = `ThemeInput__input theme-input-text ${negativeClass} ${icon ? 'ThemeInput--icon '+ icon : ''}`;
        const labelClass = `ThemeInput__label theme-input-text ${negativeClass} ${icon ? '--icon ' : ''} ${this.state.isEmpty ? '' : '--active'}`;

        return(
            <div className={`ThemeInput ${className || ''}`}>
                <input type={other.type || 'text'} className={inputClass} value={ this.state.value } onChange={this.handleData} {...other}/>
                <label className={labelClass} htmlFor={other.name}>{other.label}</label>
            </div>
        )
    }
}

ThemeInput.defaultProps = {
    negative: false,
    icon: ''
}