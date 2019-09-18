import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { processLogin } from './../../actions';
import CacheHelper from './../../utils/cache';
import { extractValues } from './../../utils/formUtils';
import FormValidator from './../../services/FormValidator';
import AlertService from './../../services/AlertService';
import ThemeButton from './../ThemeButton';
import ThemeInput from './../ThemeInput';

import './Login.scss';

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email: {
                type: 'email',
                label: 'Email',
                value: '',
                validations: ['required', 'email']
            },
            password: {
                type: 'password',
                label: 'Password',
                value: '',
                validations: ['required'],
            }
        }
    }

    isFormValid(){
        const validatedFormData = FormValidator.validateFormSection(this.state);
        const hasErrors = !FormValidator.isFormSectionValid(validatedFormData);
        this.setState({ ...validatedFormData });
        return !hasErrors;
    }

    processLogin = (event) => {
        event.preventDefault();
        if(!this.isFormValid()){
            AlertService.triggerAlert({
                id: 'process-login',
                type:'error',
                highlight: 'Ups!',
                text: 'Corrige los errores en el formulario'
            })
            return;
        }
        this.props.processLogin(extractValues(this.state));
    }
      
    handleInputData = (event) => {
        const { value, name } = event.target;
        const target = FormValidator.validateInput({ ...this.state[name], value });
        this.setState({ [name]: target });
    }

    render(){
        const isMobile = this.props.browser.lessThan.medium;
        const { email, password } = this.state;
        const auth = CacheHelper.getItem('auth'),
              isAuthenticated = auth && auth.authenticated || false;
        if(isAuthenticated) {
            return <Redirect to={ { pathname: '/pacientes' } } />
        }
        return(
            <article className="Login">
                <div className="Login__poster visible-xs"></div>
                <h1 className="Login__title theme-title hidden-xs">Bienvenido</h1>
                <p className="Login__description theme-subtitle hidden-xs">Por favor ingresa tus credenciales para continuar</p>
                <img className="Login__logo visible-xs" src={require('./../../theme/images/villafeet-logo.svg')}/>
                <form className="Login__form login-form" onSubmit={this.processLogin}>
                    <ThemeInput
                        className="login-form__input"
                        negative={isMobile}
                        icon="email"
                        name="email"
                        onChange={this.handleInputData}
                        {...email}
                    />
                    <ThemeInput
                        className="login-form__input"
                        negative={isMobile}
                        icon="lock"
                        name="password"
                        onChange={this.handleInputData}
                        {...password}
                    />
                </form>
                <ThemeButton className="Login__button" onClick={this.processLogin} type="submit" big={true} title="Ingresar"/>
            </article>
        )
    }
}

function mapDispatchToProps (dispatch) {
    return {
        processLogin: credentials => { dispatch(processLogin(credentials)) }
    }
}

function mapStateToProps (state) {
    return {
        browser: state.browser,
        auth: state.auth,
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
