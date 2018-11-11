import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import NavigationBar from './../components/NavigationBar';
import UserHeader from './../components/UserHeader';
import MobileHeader from './../components/MobileHeader';
import './MainLayout.scss';

const MainLayout = ({component: Component, auth, ...rest}) => {

    return (
      <Route {...rest} render={ matchProps => auth ? (
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
