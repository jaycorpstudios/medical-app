import React from 'react';
import './index.scss';


export default function(props){
    return(
        <article className="login">
            <div className="login__poster visible-xs"></div>
            <h1 className="login__title text-title hidden-xs">Bienvenido</h1>
            <p className="login__description text-subtitle hidden-xs">Por favor ingresa tus credenciales para continuar</p>
            <img className="login__logo visible-xs" src={require('./../../theme/images/villafeet-logo.svg')}/>
            <form className="login__form login-form">
                <input type="email" autoCapitalize="none" placeholder="Correo" className="login-form__input theme-input input-icon-email"></input>
                <input type="password" placeholder="Password" className="login-form__input theme-input input-icon-password"></input>
            </form>
            <button type="submit" className="login__button button--primary button--block">Ingresar</button>
        </article>
    )
}
