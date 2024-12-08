import React, { useContext, useState, useEffect } from 'react'
import { Context as YocoContext } from '../../context/YocoContext'
import './yocoPaymentPortal.css'

const YocoPaymentPortal = () => {
  const { state, initiatePayment, clearPaymentData } = useContext(YocoContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handlePayment = async () => {
    try {
      setLoading(true)
      setError(null)

      const startTime = Date.now()
      localStorage.setItem('paymentStartTime', startTime)
      localStorage.setItem('paymentInProgress', 'true')

      await initiatePayment({
        amountInCents: 2799,
        currency: 'ZAR',
        description: 'Test Purchase',
      })

      setLoading(false)
      setShowConfirmation(true)
    } catch (error) {
      console.error('Payment error:', error)
      setError(error.message || 'Failed to initialize payment')
      setLoading(false)
    }
  }

  const handleProceedToPayment = () => {
    if (state.paymentData?.redirectUrl) {
      window.location.href = state.paymentData.redirectUrl
    } else {
      setError('No redirect URL available')
    }
  }

  const handleCancelPayment = () => {
    localStorage.removeItem('paymentInProgress')
    localStorage.removeItem('paymentStartTime')
    clearPaymentData()
    window.location.href = '/payment-cancelled'
  }

  return (
    <div className="payment-container">
      <h2>Make Payment</h2>
      {error && <div className="error-message">{error}</div>}

      {!showConfirmation ? (
        <button
          onClick={handlePayment}
          disabled={loading}
          className="payment-button"
        >
          {loading ? 'Processing...' : 'Pay with Card'}
        </button>
      ) : (
        <div className="confirmation-screen">
          <p>You will be redirected to Yoco's secure payment page.</p>
          <button onClick={handleProceedToPayment} className="proceed-button">
            Proceed to Payment
          </button>
          <button onClick={handleCancelPayment} className="cancel-button">
            Cancel Payment
          </button>
        </div>
      )}
    </div>
  )
}

export default YocoPaymentPortal
