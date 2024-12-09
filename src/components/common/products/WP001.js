import React, { useContext } from 'react'

import { Context as CardsContext } from '../../../context/CardsContext'
import logo from '../../../assets/images/logo/logo-512.png'
import './wp001.css'

const WP001 = () => {
  const {
    state: { cardToBuy },
    setCardToBuy,
  } = useContext(CardsContext)

  const productDetails = [
    { label: 'productCode', value: 'WP001' },
    { label: 'Price', value: '39.00' },
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

  const handleBuyNowClick = () => {
    setCardToBuy({ productCode: 'WP001', price: 3900 })
  }

  const renderBuyButton = () => {
    if (!cardToBuy) {
      return (
        <button className="coupon-button" onClick={handleBuyNowClick}>
          Buy Now
        </button>
      )
    } else {
      const formattedPrice = (cardToBuy.price / 100).toFixed(2)
      return <button className="coupon-button">Price: R{formattedPrice}</button>
    }
  }

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={logo} alt="Watchlist Pro Logo" />
      </div>
      <div className="product-details">
        {!cardToBuy
          ? productDetails.map((detail, index) => (
              <div key={index} className="detail-row">
                <span className="label">{detail.label}</span>
                <span className="value">{detail.value}</span>
              </div>
            ))
          : null}
        {renderBuyButton()}
      </div>
    </div>
  )
}

export default WP001
