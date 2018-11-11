import React from 'react';
import Login from './../../components/Login';
import './LoginPage.scss';

export default function HomePage (props) {

  const { history } = props;
  return (
    <main className="LoginPage">
      <section className="LoginPage__container">
        <Login history={history}/>
      </section>
      <aside className="LoginPage__poster">
        <img className="LoginPage__poster__logo" src={require('./../../theme/images/villafeet-logo.svg')}/>
      </aside>
    </main>
  )
}
