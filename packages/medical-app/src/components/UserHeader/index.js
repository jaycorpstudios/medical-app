import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './UserHeader.scss';
import DropDown from '../DropDown';
import { logout, getUserData } from '../../actions';

class UserHeader extends React.Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    const {
      name, lastName, avatar, id = null,
    } = this.props.user;
    const isLoaded = !!id;
    const fullName = `${name} ${lastName}`;
    const dropDownOptions = [
      { title: 'Salir', icon: 'exit_to_app', onClick: this.props.logout },
    ];

    if (!this.props.auth.authenticated) {
      return <Redirect to={{ pathname: '/' }} />;
    }

    return (
      <header className="UserHeader visible-lg">
        <button className="UserHeader__action notifications" />
        <button className="UserHeader__action settings" />
        {isLoaded && (
        <figure className="UserHeader__user">
          <figcaption className="theme-body-small">{fullName}</figcaption>
          <DropDown options={dropDownOptions}>
            <img src={avatar} alt={fullName} />
          </DropDown>
        </figure>
        )}
      </header>
    );
  }
}

function mapDispachToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
    getUser: () => dispatch(getUserData()),
  };
}

function mapStateToProps(state) {
  return {
    user: state.user.data,
    auth: state.auth,
  };
}

export default connect(mapStateToProps, mapDispachToProps)(UserHeader);
