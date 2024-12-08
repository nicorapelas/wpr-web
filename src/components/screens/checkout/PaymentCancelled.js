import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PaymentCancelled = () => {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    // Log component mount and URL parameters for debugging
    console.log('Payment Cancelled component mounted')
    const params = new URLSearchParams(window.location.search)
    console.log('URL Parameters:', Object.fromEntries(params.entries()))

    // Start countdown for automatic redirect
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          navigate('/') // or navigate('/dashboard') depending on your flow
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [navigate])

  return (
    <div className="payment-result-container">
      <h2>Payment Cancelled</h2>
      <p>Your payment was cancelled. No charges were made.</p>
      <p>Redirecting to home in {countdown} seconds...</p>
      <button onClick={() => navigate('/')} className="back-button">
        Back to Home Now
      </button>
    </div>
  )
}

export default PaymentCancelled
