import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import NavigationBar from './../components/NavigationBar';
import UserHeader from './../components/UserHeader';
import MobileHeader from './../components/MobileHeader';
import './MainLayout.scss';

import CacheHelper from './../utils/cache';

const MainLayout = ({component: Component, ...rest}) => {

  const auth = CacheHelper.getItem('auth');
        const isAuthenticated = auth && auth.authenticated || false;

    return (
      <Route {...rest} render={ matchProps => isAuthenticated ? (
        <div className='Dashboard'>
            <NavigationBar path={rest.path}/>
            <UserHeader/>
            <MobileHeader/>
            <main className="MainContent">
              <Component {...matchProps} />
            </main>
        </div>
      ) : <Redirect to={ { pathname: '/', state: { from: matchProps.location } } } /> } />
    )
  };

  export default MainLayout;
