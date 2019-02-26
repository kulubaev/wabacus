import React from 'react';
import source from './assets/busy.gif';
import './styles/busy.scss';

const Busy = (props) => (
    <img alt="busy" className={`busy ${props.className}`}   src={source} height="32" width="32"  />
);

export default Busy;

