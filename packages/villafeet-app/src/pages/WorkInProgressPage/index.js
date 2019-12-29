import React from 'react';
import './WorkInProgressPage.scss';

const wipImage = require('./../../theme/images/in-progress.png');

export default function WorkInProgressPage() {
  return (
    <div className="WorkInProgressPage">
      <section className="WorkInProgressPage__container">
        <img src={wipImage} alt="Work in progress" />
        <h1 className="theme-heading-medium">Próximamente</h1>
        <h2 className="theme-body-small">Trabajo en progreso…</h2>
      </section>
    </div>
  );
}
