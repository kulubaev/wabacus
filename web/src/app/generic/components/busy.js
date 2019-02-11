import React from 'react';
import source from './assets/busy.gif';
import './styles/busy.scss';

const Busy = () => (
    <img alt="busy" className="busy" src={source} height="32" width="32" />
);

export default Busy;

