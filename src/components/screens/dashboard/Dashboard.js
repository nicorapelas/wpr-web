import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Context as AuthContext } from '../../../context/AuthContext'
import { Context as CardsContext } from '../../../context/CardsContext'
import NetworkChecker from '../../common/NetworkChecker'
import WP001 from '../../common/products/WP001'
import WP002 from '../../common/products/WP002'
import WP003 from '../../common/products/WP003'
import UpdatePassword from './updatePassword/UpdatePassword'
import CardToBuyConfirm from './cardToBuyConfirm/CardToBuyConfirm'
import './dashboard.css'

const Dashboard = () => {
  const [passwordUpdated, setPasswordUpdated] = useState(true)

  const {
    state: { user },
    signout,
    setIsAuthChecked,
  } = useContext(AuthContext)

  const {
    state: { cardToBuy },
  } = useContext(CardsContext)

  const navigate = useNavigate()

  useEffect(() => {
    console.log('user', user)
    if (user) {
      const { passwordUpdated } = user
      setPasswordUpdated(passwordUpdated)
    }
  }, [user])

  const handleMyCardsPress = () => {
    navigate('/my-cards')
  }

  const handleSignout = () => {
    setIsAuthChecked(false)
    signout()
  }

  const renderContent = () => {
    if (!passwordUpdated) {
      return <UpdatePassword />
    }
    if (cardToBuy) {
      return <CardToBuyConfirm />
    }
    return (
      <div className="dashboard-container">
        <div className="dashboard-buttons-container">
          <button className="nav-button" onClick={handleMyCardsPress}>
            My Cards
          </button>
          <button className="signout-button" onClick={handleSignout}>
            Sign Out
          </button>
        </div>
        <main className="dashboard-content">
          <WP001 />
          <WP002 />
          <WP003 />
        </main>
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

export default Dashboard
