import React from 'react';
import source from './assets/busy.gif';
import styles from './styles/busy.scss';

const Busy = () => (
    <img className={styles.busy} src={source} height="32" width="32" />
);

export default Busy;

