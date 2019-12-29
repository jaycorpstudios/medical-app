import React from 'react';
import { Link } from 'react-router-dom';
import UserPhoto from '../UserPhoto';

import dateUtils from '../../utils/dateUtils';
import './PatientListItem.scss';

export default class PatientListItem extends React.Component {
  render() {
    const { avatar, id, lastVisit } = this.props;
    const {
      name = '', firstSurname = '', secondSurname = '', gender,
    } = this.props;
    const fullName = `${name} ${firstSurname} ${secondSurname}`;
    const time = dateUtils.getFormatedDate(lastVisit);

    return (
      <Link to={`/pacientes/${id}`}>
        <article className="PatientListItem">
          <UserPhoto className="PatientListItem__user-photo" src={avatar} name={fullName} gender={gender} />
          <span className="theme-body-small">{fullName}</span>
          <span className="PatientListItem__last-visit theme-body-small hidden-xs">{time}</span>
          <button className="PatientListItem__contact-btn visible-xs" />
          <button className="PatientListItem__edit-btn hidden-xs" />
        </article>
      </Link>
    );
  }
}
