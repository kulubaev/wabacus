//component.js
import React from 'react';
import { connect } from 'react-redux';

import Header from './header';
import Footer from './footer';
import Calculator from './calculator';
import History from './ops-history';


import './styles/index.scss';


const Home = ({ busy }) => (

  <div className="container">
    <Header />
    <>
    <main className="content"><History/> </main>
    <aside className="sidebar"><Calculator/></aside>
    </>
    <Footer/>
  </div>

 );

const mapToProps = ({ status: busy }) => {
  return {
    busy
  };
};

export default connect(mapToProps)(Home);
