import React, { useState } from 'react'

import ngrok from '../../api/ngrok'
import './paymentPortal.css'

const PaymentPortal = () => {
  const [paymentData, setPaymentData] = useState({
    amount: '',
    item_name: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await ngrok.post('/payment/create-payment', paymentData)
      console.log('Server Response:', response.data)

      if (response.data.success) {
        // Create FormData object to see what's being sent
        const formData = new FormData()

        // Required PayFast fields in specific order
        const requiredFields = [
          'merchant_id',
          'merchant_key',
          'return_url',
          'cancel_url',
          'notify_url',
          'name_first',
          'name_last',
          'email_address',
          'cell_number',
          'm_payment_id',
          'amount',
          'item_name',
          'payment_method',
          'subscription_type',
        ]

        // Add fields and log them
        requiredFields.forEach((fieldName) => {
          if (response.data.paymentData[fieldName]) {
            formData.append(fieldName, response.data.paymentData[fieldName])
            console.log(
              `Field ${fieldName}:`,
              response.data.paymentData[fieldName],
            )
          }
        })

        // Add signature last
        formData.append('signature', response.data.paymentData.signature)
        console.log('Signature:', response.data.paymentData.signature)

        // Log the complete form data
        console.log('Complete form data:')
        for (let pair of formData.entries()) {
          console.log(pair[0] + ': ' + pair[1])
        }

        // Add a confirmation step
        const shouldProceed = window.confirm(
          'Review the console output and click OK to proceed with payment, or Cancel to stop.',
        )

        if (shouldProceed) {
          // Create and submit the form
          const form = document.createElement('form')
          form.setAttribute('method', 'POST')
          form.setAttribute('action', response.data.paymentUrl)
          form.setAttribute('enctype', 'application/x-www-form-urlencoded')

          // Add all fields to the form
          for (let pair of formData.entries()) {
            const input = document.createElement('input')
            input.type = 'hidden'
            input.name = pair[0]
            input.value = pair[1]
            form.appendChild(input)
          }

          document.body.appendChild(form)
          form.submit()
        }
      }
    } catch (error) {
      console.error(':', error)
      alert('Payment initiation failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="payment-form-container">
      <h2>Make Payment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Amount (ZAR)</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={paymentData.amount}
            onChange={handleInputChange}
            required
            min="1"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="item_name">Item Name</label>
          <input
            type="text"
            id="item_name"
            name="item_name"
            value={paymentData.item_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="payment-button" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Proceed to Payment'}
        </button>
      </form>
    </div>
  )
}

export default PaymentPortal
