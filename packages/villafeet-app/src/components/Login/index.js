import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import formData from './formData';
import ThemeButton from './../ThemeButton';
import ThemeInput from './../ThemeInput';
import LoginHeader from './LoginHeader';
import loginStyles from './Login.module.scss';
import useFormData from './../../hooks/useFormData';
import { processLogin } from './../../actions';
import CacheHelper from './../../utils/cache';
import { extractValues } from './../../utils/formUtils';
import AlertService from './../../services/AlertService';

function triggerError() {
    AlertService.triggerAlert({
        id: 'process-login',
        type:'error',
        highlight: 'Ups!',
        text: 'Corrige los errores en el formulario'
    })
}

const Login = ({ browser, dispatchProcessLogin }) => {
    const { form, handleInputData, isFormValid } = useFormData(formData);
    const { email, password } = form;
    const isMobile = browser.lessThan.medium;
    const auth = CacheHelper.getItem('auth');
    const isAuthenticated = auth && auth.authenticated || false;
    const { container, button, input } = loginStyles;
    const processLogin = (event) => {
        event.preventDefault();
        if(!isFormValid()) {
            triggerError()
            return;
        }
        dispatchProcessLogin(extractValues(form));
    }
    if(isAuthenticated) {
        return <Redirect to={ { pathname: '/pacientes' } } />
    }
    return (
        <article className={container}>
            <LoginHeader/>
            <form className={loginStyles.form} onSubmit={processLogin}>
                <ThemeInput
                    className={input}
                    negative={isMobile}
                    icon="email"
                    name="email"
                    onChange={handleInputData}
                    {...email}
                />
                <ThemeInput
                    className={input}
                    negative={isMobile}
                    icon="lock"
                    name="password"
                    onChange={handleInputData}
                    {...password}
                />
                <button type="submit" style={{ display: 'none' }}/>
            </form>
            <ThemeButton className={button} onClick={processLogin} type="submit" big={true} title="Ingresar"/>
        </article>
    )
}

function mapDispatchToProps (dispatch) {
    return {
        dispatchProcessLogin: credentials => { dispatch(processLogin(credentials)) }
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
