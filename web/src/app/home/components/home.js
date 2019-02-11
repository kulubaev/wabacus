//component.js
import React from 'react';
import { connect } from 'react-redux';

import Header from './header';
import Footer from './footer';
import Calculator from './calculator';
import History from './ops-history';
import { Busy }  from '../../generic'

import './styles/index.scss';



const Home = ({ busy }) => (

  <div className="container">
    <Header />
    <>
    {(busy && <Busy className="busy"/> || '')}
    <main className="content"><History/> </main>
    <aside className="sidebar"><Calculator/></aside>
    </>
    <Footer/>
  </div>

 );

const mapToProps = ({generic: busy}) => ({
    busy
});

export default connect(mapToProps)(Home);
