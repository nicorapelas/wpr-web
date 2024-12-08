import React, { useContext } from 'react'

import { Context as AuthContext } from '../../../context/AuthContext'
import WP001 from '../../common/products/WP001'
import './dashboard.css'

const Dashboard = () => {
  const { signout, setIsAuthChecked } = useContext(AuthContext)

  const handleSignout = () => {
    signout()
    setIsAuthChecked(false)
  }

  return (
    <div className="dashboard-container">
      <button className="signout-button" onClick={handleSignout}>
        Sign Out
      </button>
      <main className="dashboard-content">
        <WP001 />
      </main>
    </div>
  )
}

export default Dashboard
