import React from 'react';
import Login from './../../components/Login';
import './index.scss';

export default function HomePage (props) {
  return (
    <main className="login-page">
      <section className="login-page__container">
        <Login/>
      </section>
      <aside className="login-page__poster">
        <img className="login-page__poster__logo" src={require('./../../theme/images/villafeet-logo.svg')}/>
      </aside>
    </main>
  )
}
