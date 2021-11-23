import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import LeftMenu from '../LeftMenu/LeftMenu'

import './portal-base.css'
function Portal() {

  return ReactDOM.createPortal(
    <>
      <div className={`portal-wrapper overlayed'}`}>
      </div>
    </>,
    document.getElementById('portal-root'),
  );
}

export default Portal
