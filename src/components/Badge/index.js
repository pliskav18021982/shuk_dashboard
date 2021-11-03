/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

export default function Badge({content}) {
  return (
    <>
      <div className="col-6 col-xl-3 mt-2">
        <div className="col-xl-12 dashboard-display p-3">
          <a className="block block-link-shadow text-left" href="#">
            <div className="block-content block-content-full clearfix">
              <div className="float-right mt-10 d-none d-sm-block">
                <i className="dashboard-display-icon icon-store2"></i>
              </div>
              <div className="dashboard-display-number">{content.number}</div>
              <div className="font-size-sm text-uppercase text-muted">
                {content.type}
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
