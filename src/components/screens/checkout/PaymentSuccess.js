import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PaymentSuccess = () => {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    // Log component mount and URL parameters
    console.log('Payment Success component mounted')
    const params = new URLSearchParams(window.location.search)
    console.log('URL Parameters:', Object.fromEntries(params.entries()))

    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          navigate('/dashboard') // or navigate('/') depending on your flow
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [navigate])

  return (
    <div className="payment-result-container">
      <h2>Payment Successful! 🎉</h2>
      <p>Thank you for your payment.</p>
      <p>Redirecting in {countdown} seconds...</p>
      <button onClick={() => navigate('/dashboard')} className="back-button">
        Go to Dashboard Now
      </button>
    </div>
  )
}

export default PaymentSuccess
