import React from 'react'

import deliveryTruck from 'public/delivery-truck.png'

import './style.css'

const Popup = ({ style, isCluster, object }) =>
  !isCluster && (
    <div className="tooltip" style={style}>
      <div className="tooltip__icon">
        <img height="56" width="56" src={deliveryTruck} />
      </div>
      <div className="tooltip__title">{object?.name}</div>
      <div className={`tooltip__status tooltip__status--${object?.speed ? 'moving' : 'parked'}`}>
        {object?.speed ? 'moving' : 'parked'}
      </div>
      <div className="row">
        <div className="row__head">Current speed</div>
        <div className="row__body">{`${(object?.speed || 0).toFixed(1)} Km/h`}</div>
      </div>
      <div className="row">
        <div className="row__head">Current altitude</div>
        <div className="row__body">{`${object?.altitude.toFixed(2)} m`}</div>
      </div>
    </div>
  )

export default Popup
