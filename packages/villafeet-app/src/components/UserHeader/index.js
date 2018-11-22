import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './UserHeader.scss';
import CacheHelper from './../../utils/cache';
import { logout } from './../../actions';

const UserHeader = props => {
    const { nombre, apellido, avatar, isLoaded } = props.user;
    const nombreCompleto = `${nombre} ${apellido}`;
    const auth = CacheHelper.getItem('auth'),
              isAuthenticated = auth && auth.authenticated || false;

    if(!isAuthenticated){
        return <Redirect to={ { pathname: '/' } } />
    }

    return (
        <header className="UserHeader visible-lg">
            <button className="UserHeader__action notifications"></button>
            <button className="UserHeader__action settings"></button>
            {isLoaded && <figure className="UserHeader__user">
                <figcaption className="theme-body-small">{nombreCompleto}</figcaption>
                <img src={avatar} alt={nombreCompleto} onClick={props.logout}/>
            </figure>}
        </header>
    )
}

function mapDispachToProps (dispatch) {
    return {
        logout: () => dispatch(logout())
    }
}

function mapStateToProps (state) {
    return {
        user: state.firebase.profile
    }
}

export default connect(mapStateToProps, mapDispachToProps)(UserHeader)
