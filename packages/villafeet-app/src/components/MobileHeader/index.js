import React from 'react';
import './MobileHeader.scss';

const logoImage = require('./../../theme/images/villafeet-Iso.svg');

const MobileHeader = () => (
  <div className="MobileHeader hidden-lg">
    <img src={logoImage} className="MobileHeader__iso" alt="Villafeet Logo" />
    <h1 className="MobileHeader__title theme-body-regular">PACIENTES</h1>
    <button className="MobileHeader__menu-btn" type="button" />
  </div>
);

export default MobileHeader;
