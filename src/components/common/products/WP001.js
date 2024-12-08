import React, { useContext } from 'react'
import { Context as CouponContext } from '../../../context/CouponContext'

import logo from '../../../assets/images/logo/logo-512.png'
import './wp001.css'

const WP001 = () => {
  const { getCoupon } = useContext(CouponContext)

  const productDetails = [
    { label: 'Brand:', value: 'WATCHLISTPRO' },
    { label: 'Service Type:', value: 'VOD' },
    { label: 'Charging Type:', value: 'Recharge card' },
    { label: 'Period Plan:', value: 'Monthly' },
    { label: 'Total Session:', value: '1' },
    { label: 'TV Session:', value: '1' },
    { label: 'Mobile & Web Session:', value: '1' },
    { label: 'CDN service:', value: 'Not include CDN' },
    { label: 'Network type:', value: 'OTT' },
    { label: 'Product:', value: 'Watchlistpro Monthly' },
  ]

  const handleCouponClick = () => {
    getCoupon({ code: 'WP001' })
  }

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={logo} alt="Watchlist Pro Logo" />
      </div>
      <div className="product-details">
        {productDetails.map((detail, index) => (
          <div key={index} className="detail-row">
            <span className="label">{detail.label}</span>
            <span className="value">{detail.value}</span>
          </div>
        ))}
        <button className="coupon-button" onClick={handleCouponClick}>
          Get Coupon
        </button>
      </div>
    </div>
  )
}

export default WP001
