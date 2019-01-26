//component.js
import React from 'react';
import { connect } from 'react-redux';

import Header from './header';
import Footer from './footer';
import OpsHistory from './ops-history';

import Calculator from './calculator';
import Busy from '../../generic/components/busy';

import './styles/home.scss';
import './styles/layout.scss';


const Home = ({ busy }) => (
  <div className="home">
    <div className="grid-centered">
      <Header />
      <main>
        {busy && <Busy /> }
        <OpsHistory/>
      </main>
      <aside>
        <Calculator/>
      </aside>
      <Footer />
    </div>
  </div>
);

const mapToProps = ({ status: busy }) => {
  return {
    busy
  };
};

export default connect(mapToProps)(Home);
