import React from 'react';
import { connect } from 'react-redux';
import { processLogin } from './../../actions';
import CacheHelper from './../../utils/cache';
import AlertService from './../../services/AlertService';
import { Redirect } from 'react-router-dom';

import ThemeButton from './../ThemeButton';
import ThemeInput from './../ThemeInput';

import './Login.scss';

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleInputData = this.handleInputData.bind(this);
        this.processLogin = this.processLogin.bind(this);
    }

    processLogin (event) {
        event.preventDefault();
        this.props.processLogin(this.state);
    }

    handleInputData (event) {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    render(){
        const isMobile = this.props.browser.lessThan.medium;
        const auth = CacheHelper.getItem('auth'),
              isAuthenticated = auth && auth.authenticated || false;

        if(this.props.auth.error && this.props.auth.error.message){
            AlertService.triggerAlert({ id: 'login', type: 'error', text: this.props.auth.error.message })
        }

        if(isAuthenticated){
            const { data = {} } = this.props.user;
            const welcomeMessage = `Bienvenid@ ${data.name || ''}`
            AlertService.triggerAlert({ id: 'login', type: 'success', text: welcomeMessage })
            return <Redirect to={ { pathname: '/pacientes' } } />
        }

        return(
            <article className="Login">
                <div className="Login__poster visible-xs"></div>
                <h1 className="Login__title theme-title hidden-xs">Bienvenido</h1>
                <p className="Login__description theme-subtitle hidden-xs">Por favor ingresa tus credenciales para continuar</p>
                <img className="Login__logo visible-xs" src={require('./../../theme/images/villafeet-logo.svg')}/>
                <form className="Login__form login-form" onSubmit={this.processLogin}>
                    <ThemeInput className="login-form__input" negative={isMobile}
                                type="email" icon="email" label="Email" name="email" value={this.state.email} onChange={this.handleInputData}/>
                    <ThemeInput className="login-form__input" negative={isMobile}
                                type="password" icon="lock" label="Password" name="password" value={this.state.password} onChange={this.handleInputData}/>
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