import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import classnames from 'classnames';
import NavigationBar from '../components/NavigationBar';
import UserHeader from '../components/UserHeader';
import MobileHeader from '../components/MobileHeader';
import styles from './MainLayout.module.scss';

import CacheHelper from '../utils/cache';
import AlertList from '../components/AlertList';

const MainLayout = ({ component: Component, blur, ...rest }) => {
  const auth = CacheHelper.getItem('auth');
  const isAuthenticated = auth && auth.authenticated ? auth.authenticated : false;
  const { blurApp, dashboard, mainContent } = styles;
  const dashboardStyles = classnames({ [blurApp]: blur }, dashboard);
  console.log('el main layout tiene estos props', rest)
  return (
    <Route
      {...rest}
      render={(matchProps) => (isAuthenticated ? (
        <div className={dashboardStyles}>
          <AlertList />
          <NavigationBar path={rest.path} />
          <UserHeader />
          <MobileHeader />
          <main className={mainContent}>
            <Component {...matchProps} />
          </main>
        </div>
      ) : <Redirect to={{ pathname: '/', state: { from: matchProps.location } }} />)}
    />
  );
};

const mapStateToProps = (state) => {
  const { app = {} } = state;
  return {
    blur: app.blur,
  };
};

export default connect(mapStateToProps)(MainLayout);
