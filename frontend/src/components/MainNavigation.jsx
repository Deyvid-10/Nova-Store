import {Outlet} from 'react-router-dom'

import MainNavBar from './MainNavBar';
import Footer from './Footer'
import React from 'react';

function MainNavigation() {
  return (
    <>
      <MainNavBar/>
        <Outlet/>
      <Footer/>
    </>
  );
}

export default MainNavigation;