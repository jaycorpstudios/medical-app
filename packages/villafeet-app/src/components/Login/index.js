import React from 'react';
import { connect } from 'react-redux';

import ThemeButton from './../ThemeButton';
import ThemeInput from './../ThemeInput';

import './Login.scss';


function Login(props){
    //Temporal implementation to navigate
    const processLogin = event => {
		props.history.push('/pacientes');
    }

    return(
        <article className="Login">
            <div className="Login__poster visible-xs"></div>
            <h1 className="Login__title theme-title hidden-xs">Bienvenido</h1>
            <p className="Login__description theme-subtitle hidden-xs">Por favor ingresa tus credenciales para continuar</p>
            <img className="Login__logo visible-xs" src={require('./../../theme/images/villafeet-logo.svg')}/>
            <form className="Login__form login-form">
                <ThemeInput className="login-form__input" negative={props.browser.is.small} type="email" icon="email" label="Email"/>
                <ThemeInput className="login-form__input" negative={props.browser.is.small} type="password" icon="lock" label="Password"/>
            </form>
            <ThemeButton className="Login__button" onClick={processLogin.bind(this)} type="submit" big={true} title="Ingresar"/>
        </article>
    )
}

function mapDispatchToProps (dispatch) {
    return {}
  }

  function mapStateToProps (state, props) {
    return {
        browser: state.browser
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Login)
