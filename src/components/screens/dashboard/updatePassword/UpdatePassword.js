import React, { useState, useContext, useEffect } from 'react'
import { Context as AuthContext } from '../../../../context/AuthContext'
import LoaderFullScreen from '../../../common/loaders/fullScreenLoader/LoaderFullScreen'
import logo from '../../../../assets/images/logo/logo-512.png'
import './updatePassword.css'

const UpdatePassword = () => {
  const [error, setError] = useState('')

  const {
    state: { loading, user },
    updatePassword,
  } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password2: '',
  })

  // Update formData when user data becomes available
  useEffect(() => {
    if (user?.username) {
      setFormData((prevState) => ({
        ...prevState,
        username: user.username,
      }))
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password !== formData.password2) {
      setError('Passwords do not match')
      return
    }
    setError('')
    updatePassword(formData)
  }

  if (loading) {
    return <LoaderFullScreen />
  }

  return (
    <div className="signup-container">
      <img src={logo} alt="Logo" className="auth-logo" />
      <h2 className="auth-title">Update Password</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="update-password-error-message">{error}</div>}
        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter new password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            id="password2"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            placeholder="Confirm new password"
          />
        </div>
        <button type="submit" className="signup-button">
          Update Password
        </button>
      </form>
    </div>
  )
}

export default UpdatePassword
