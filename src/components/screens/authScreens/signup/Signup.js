import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import NetworkChecker from '../../../common/NetworkChecker'
import logo from '../../../../assets/images/logo/logo-512.png'
import AuthError from '../authApiFeedback/authError/AuthError'
import { Context as AuthContext } from '../../../../context/AuthContext'
import './signup.css'

const Signup = () => {
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    password: '',
    password2: '',
  })

  const {
    state: { apiMessage, errorMessage },
    register,
    clearErrorMessage,
  } = useContext(AuthContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (apiMessage) {
      navigate('/login')
    }
  }, [apiMessage])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleOnFocus = () => {
    clearErrorMessage()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    register(formData)
  }

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Phone</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onFocus={handleOnFocus}
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onFocus={handleOnFocus}
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            onFocus={handleOnFocus}
          />
        </div>
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
    )
  }

  const renderContent = () => {
    return (
      <div className="signup-container">
        <img src={logo} alt="logo" className="auth-logo" />
        {!errorMessage ? (
          <div className="auth-title">Sign up, become a partner</div>
        ) : (
          <AuthError error={errorMessage} />
        )}
        {renderForm()}
      </div>
    )
  }

  return (
    <>
      <NetworkChecker />
      {renderContent()}
    </>
  )
}

export default Signup
