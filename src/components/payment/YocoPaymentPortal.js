import React, { useContext, useState, useEffect } from 'react'
import { Context as YocoContext } from '../../context/YocoContext'
import { Context as CardsContext } from '../../context/CardsContext'
import './yocoPaymentProtal.css'

const YocoPaymentPortal = () => {
  const {
    state: { confirmPurchase },
    initiatePayment,
    setConfirmPurchase,
  } = useContext(YocoContext)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const {
    state: { cardToBuy },
    setCardToBuy,
  } = useContext(CardsContext)

  useEffect(() => {
    console.log('confirmPurchase', confirmPurchase)
    console.log('cardToBuy', cardToBuy)
    if (confirmPurchase) {
      const { productCode, price } = cardToBuy
      handlePayment(productCode, price)
      setCardToBuy(null)
      setConfirmPurchase(false)
    }
  }, [confirmPurchase, cardToBuy])

  const handlePayment = async (productCode, price) => {
    try {
      setLoading(true)
      setError(null)

      const startTime = Date.now()
      localStorage.setItem('paymentStartTime', startTime)
      localStorage.setItem('paymentInProgress', 'true')

      const response = await initiatePayment({
        amountInCents: price,
        currency: 'ZAR',
        description: productCode,
      })

      if (response?.redirectUrl) {
        window.location.href = response.redirectUrl
      } else {
        setError('No redirect URL available')
        setLoading(false)
      }
    } catch (error) {
      console.error('Payment error:', error)
      setError(error.message || 'Failed to initialize payment')
      setLoading(false)
    }
  }

  return (
    <div className="payment-container">
      <h2>Make Payment</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="payment-status">
        {loading ? 'Processing...' : 'Pay with Card'}
      </div>
    </div>
  )
}

export default YocoPaymentPortal
