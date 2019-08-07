import React from 'react';
import './ThemeInput.scss';

export default class ThemeInput extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isEmpty: true
        }
        this.updateLabel = this.updateLabel.bind(this);
    }

    updateLabel() {
        this.setState({ isEmpty: !this.props.value });
    }

    componentDidMount() {
        this.updateLabel()
    }

    render() {

        const {icon, className, negative, value, ...other} = this.props;
        const negativeClass = negative ? '--negative' : '';
        const inputClass = `ThemeInput__input theme-input-text ${negativeClass} ${icon ? 'ThemeInput--icon '+ icon : ''}`;
        const labelClass = `ThemeInput__label theme-input-text ${negativeClass} ${icon ? '--icon ' : ''} ${!!value || !this.state.isEmpty ? '--active' : ''}`;

        return(
            <div className={`ThemeInput ${className || ''}`}>
                <input type={other.type || 'text'} className={inputClass} value={ value } onFocus={this.updateLabel} onBlur={this.updateLabel} {...other}/>
                <label className={labelClass} htmlFor={other.name}>{other.label}</label>
            </div>
        )
    }
}

ThemeInput.defaultProps = {
    negative: false,
    icon: ''
}