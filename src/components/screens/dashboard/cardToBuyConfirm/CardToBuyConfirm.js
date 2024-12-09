import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { Context as CardsContext } from '../../../../context/CardsContext'
import { Context as YocoContext } from '../../../../context/YocoContext'
import WP001 from '../../../common/products/WP001'
import './cardToBuyConfirm.css'

const CardToBuyConfirm = () => {
  const {
    state: { cardToBuy },
    setCardToBuy,
  } = useContext(CardsContext)

  const { setConfirmPurchase } = useContext(YocoContext)

  const navigate = useNavigate()

  const renderSelectedCard = () => {
    if (cardToBuy.productCode === 'WP001') {
      return <WP001 />
    }
  }

  const handleCancel = () => {
    setCardToBuy(null)
  }

  const handleConfirm = () => {
    setConfirmPurchase(true)
    navigate('/checkout')
  }

  return (
    <div className="card-confirm-overlay">
      <div className="card-confirm-container">
        <div className="card-confirm-content">
          <div className="card-confirm-title">Confirm Purchase</div>
          <div className="card-confirm-product">{renderSelectedCard()}</div>
          <div className="card-confirm-actions">
            <button className="btn btn-confirm" onClick={handleConfirm}>
              Confirm
            </button>
            <button className="btn btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardToBuyConfirm
