import React, { useContext } from 'react'

import { Context as AuthContext } from '../../../context/AuthContext'
import { Context as CardsContext } from '../../../context/CardsContext'
import WP001 from '../../common/products/WP001'
import CardToBuyConfirm from './cardToBuyConfirm/CardToBuyConfirm'
import './dashboard.css'

const Dashboard = () => {
  const { signout, setIsAuthChecked } = useContext(AuthContext)
  const {
    state: { cardToBuy },
  } = useContext(CardsContext)

  const handleSignout = () => {
    signout()
    setIsAuthChecked(false)
  }

  console.log(`cardToBuy:`, cardToBuy)

  const renderContent = () => {
    if (cardToBuy) {
      return <CardToBuyConfirm />
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

  return renderContent()
}

export default Dashboard
