//component.js
import React from 'react';

import Header from './header';
import Footer from './footer';
import Calculator from '../../calculate';
import History from '../../history';

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

export default Home;
