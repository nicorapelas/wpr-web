import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PaymentSuccess = () => {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(5)

  // Log component mount and parameters
  useEffect(() => {
    console.log('Payment Success component mounted')
    const params = new URLSearchParams(window.location.search)
    console.log('URL Parameters:', Object.fromEntries(params.entries()))
  }, [])

  // Handle countdown and navigation in separate effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Handle navigation in separate effect
  useEffect(() => {
    if (countdown <= 0) {
      navigate('/dashboard')
    }
  }, [countdown, navigate])

  return (
    <div className="payment-result-container">
      <div className="payment-result-content">
        <h2>Payment Successful! 👍 </h2>
        <p>Thank you for your payment.</p>
        <p>Redirecting in {countdown} seconds...</p>
      </div>
    </div>
  )
}

export default PaymentSuccess
