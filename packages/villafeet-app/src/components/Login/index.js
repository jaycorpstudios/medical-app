import React from 'react';
import './Login.scss';
import ThemeButton from './../ThemeButton';


export default function Login(props){
    return(
        <article className="Login">
            <div className="Login__poster visible-xs"></div>
            <h1 className="Login__title theme-title hidden-xs">Bienvenido</h1>
            <p className="Login__description theme-subtitle hidden-xs">Por favor ingresa tus credenciales para continuar</p>
            <img className="Login__logo visible-xs" src={require('./../../theme/images/villafeet-logo.svg')}/>
            <form className="Login__form login-form">
                <input type="email" autoCapitalize="none" placeholder="Correo" className="login-form__input theme-input input-icon-email"></input>
                <input type="password" placeholder="Password" className="login-form__input theme-input input-icon-password"></input>
            </form>
            <ThemeButton className="Login__button" type="submit" big={true} title="Ingresar"/>
        </article>
    )
}
