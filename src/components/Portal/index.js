import React from 'react'
import ReactDOM from 'react-dom'

import './portal-base.css'
function Portal() {

  return ReactDOM.createPortal(
    <>
      <div className={`portal-wrapper overlayed'}`} />
    </>,
    document.getElementById('portal-root'),
  );
}

export default Portal
