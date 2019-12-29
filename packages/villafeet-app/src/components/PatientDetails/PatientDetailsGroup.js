import React from 'react';
import ThemeGroupTitle from '../ThemeGroupTitle';
import './PatientDetailsGroup.scss';

const renderListItems = (data) => data.map((field, index) => (
  <li key={index}>
    <strong>{field.field}</strong>
    {' '}
    <span>{field.value}</span>
  </li>
));

const PatientDetailsGroup = (props) => {
  const { title, data } = props;
  return (
    <article className="PatientDetailsGroup">
      <ThemeGroupTitle title={title} />
      <ul className="PatientDetailsGroup__list theme-body-regular">
        {renderListItems(data)}
      </ul>
    </article>
  );
};

export default PatientDetailsGroup;
