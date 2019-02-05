import React from 'react';

import './styles/header.scss';

const Header = () => (
  <header>
    <div className="tagline">
      <div>
        <span>webcal v.0.1</span>
        <span>{`{react,node}.js demo`}</span>
      </div>
    </div>
  </header>
);

export default Header;
