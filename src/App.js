/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import {Route} from 'react-router-dom'

import './assets/styles/css.css'
  import './assets/styles/styles.css'
  import './assets/styles/bootstrap.css'
  import './assets/styles/combined.css'
  import './assets/styles/layout.css'
  import './assets/styles/components.css'
  import './assets/styles/colors.css'
  import './assets/styles/animate.css'
  import './assets/styles/backend-custom.css'
  import './assets/styles/bootstrap-material-datetimepicker.css'
import OrderPage from './pages/OrderPage';
import OrdersListPage from './pages/OrdersListPage';
import Header from './components/Header';
import Badges from './components/Badges';

function App() {
 


  return (
    <>
      <Header />
      <div className="page-content pt-0">
        <div className="content-wrapper">
          <div className="content mb-5">
            <Badges />
            <Route path="/" exact component={OrdersListPage} />
            <Route path="/orders/:id" component={OrderPage} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
