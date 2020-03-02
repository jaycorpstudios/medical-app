import React from 'react';
import classnames from 'classnames';
import headerStyles from './LoginHeader.module.scss';

const LoginHeader = () => {
  const {
    poster, title, logo, description,
  } = headerStyles;
  return (
    <>
      <div className={classnames(poster, 'visible-xs')} />
      <h1 className={classnames(title, 'theme-title hidden-xs')}>Bienvenido</h1>
      <p className={classnames(description, 'theme-subtitle hidden-xs')}>Por favor ingresa tus credenciales para continuar</p>
      <img className={classnames(logo, 'visible-xs')} src={require('./../../theme/images/villafeet-logo.svg')} />
    </>
  );
};

export default LoginHeader;
