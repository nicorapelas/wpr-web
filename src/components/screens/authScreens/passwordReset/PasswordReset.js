import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import LoaderFullScreen from '../../../common/loaders/fullScreenLoader/LoaderFullScreen'
import { Context as AuthContext } from '../../../../context/AuthContext'
import './../signup/signup.css'

const PasswordReset = () => {
  const {
    state: { loading, errorMessage, apiMessage },
    resetPassword,
    clearApiMessage,
    clearErrorMessage,
  } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    password1: '',
    password2: '',
  })
  const [errors, setErrors] = useState({})
  const [useUsername, setUseUsername] = useState(true)

  useEffect(() => {
    if (errorMessage) {
      let run = setTimeout(() => {
        clearErrorMessage()
      }, 5000)
      return () => clearTimeout(run)
    }
    if (apiMessage) {
      let run = setTimeout(() => {
        clearApiMessage()
      }, 5000)
      return () => clearTimeout(run)
    }
  }, [errorMessage, apiMessage])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const toggleContactMethod = () => {
    setUseUsername(!useUsername)
    // Clear both username and phone when switching
    setFormData((prev) => ({
      ...prev,
      username: '',
      phone: '',
    }))
    // Clear related errors
    setErrors((prev) => ({
      ...prev,
      username: '',
      phone: '',
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (useUsername) {
      if (!formData.username.trim()) {
        newErrors.username = 'Username is required'
      }
    } else {
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required'
      } else if (!/^\d{10}$/.test(formData.phone.trim())) {
        newErrors.phone = 'Please enter a valid 10-digit phone number'
      }
    }

    if (!formData.password1) {
      newErrors.password1 = 'Password is required'
    } else if (formData.password1.length < 6) {
      newErrors.password1 = 'Password must be at least 6 characters'
    }

    if (!formData.password2) {
      newErrors.password2 = 'Please confirm your password'
    } else if (formData.password1 !== formData.password2) {
      newErrors.password2 = 'Passwords do not match'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    try {
      // Only send the relevant contact method
      const resetData = {
        password: formData.password1,
        ...(useUsername
          ? { username: formData.username }
          : { phone: formData.phone }),
      }
      await resetPassword(resetData)
    } catch (err) {
      setErrors({
        submit: err.message || 'An error occurred during password reset',
      })
    }
  }

  if (loading) {
    return <LoaderFullScreen />
  }

  return (
    <div className="signup-container">
      <h2 className="auth-title">Reset Password</h2>

      <form onSubmit={handleSubmit}>
        <div className="auth-toggle-container">
          <button
            type="button"
            className="auth-toggle-button"
            onClick={toggleContactMethod}
          >
            Use {useUsername ? 'Phone Number' : 'Username'} Instead
          </button>
        </div>

        {useUsername ? (
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="username"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'input-error' : ''}
            />
            {errors.username && <div className="error">{errors.username}</div>}
          </div>
        ) : (
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'input-error' : ''}
            />
            {errors.phone && <div className="error">{errors.phone}</div>}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="password1">New Password</label>
          <input
            type="password"
            id="password1"
            name="password1"
            value={formData.password1}
            onChange={handleChange}
            className={errors.password1 ? 'input-error' : ''}
          />
          {errors.password1 && <div className="error">{errors.password1}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="password2">Confirm New Password</label>
          <input
            type="password"
            id="password2"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            className={errors.password2 ? 'input-error' : ''}
          />
          {errors.password2 && <div className="error">{errors.password2}</div>}
        </div>

        {errors.submit && <div className="error">{errors.submit}</div>}
        {errorMessage && (
          <div className="password-reset-container-error-container">
            {errorMessage}
          </div>
        )}
        {apiMessage && (
          <div className="password-reset-container-api-message-container">
            {apiMessage}
          </div>
        )}

        <button type="submit" className="signup-button">
          Reset Password
        </button>

        <div className="auth-link-container">
          <Link to="/login">Back to Login</Link>
        </div>
      </form>
    </div>
  )
}

export default PasswordReset
