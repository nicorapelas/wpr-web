import React, { useContext, useEffect } from 'react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import NetworkChecker from '../../common/NetworkChecker'
import Loader from '../../common/loaders/fullScreenLoader/LoaderFullScreen'
import { Context as CardContext } from '../../../context/CardsContext'
import './myCards.css'

const MyCards = () => {
  const navigate = useNavigate()

  const {
    state: { userCards, loading, networkError },
    fetchUsersCards,
    setMyCardToView,
  } = useContext(CardContext)

  useEffect(() => {
    fetchUsersCards()
  }, [])

  useEffect(() => {
    if (networkError) {
      navigate('/network-error')
    }
  }, [networkError])

  if (loading) {
    return <Loader />
  }

  const handleBackButtonPress = () => {
    navigate('/dashboard')
  }

  const handleRowClick = (card) => {
    setMyCardToView(card)
    navigate('/my-card-view')
  }

  if (!userCards || !Array.isArray(userCards) || userCards.length === 0) {
    return (
      <div className="my-cards">
        <button
          className="my-cards__back-button"
          onClick={handleBackButtonPress}
        >
          Back
        </button>
        <div className="my-cards__content">
          <h4 className="my-cards__title">My Cards</h4>
          <p className="my-cards__empty-message">No cards available.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <NetworkChecker />
      <div className="my-cards">
        <button
          className="my-cards__back-button"
          onClick={handleBackButtonPress}
        >
          Back
        </button>
        <div className="my-cards__content">
          <h4 className="my-cards__title">My Cards</h4>
          <div className="my-cards__table-wrapper">
            <table className="my-cards__table">
              <thead>
                <tr>
                  <th>Actions</th>
                  <th>Purchase Date</th>
                  <th>Password</th>
                  <th>Card No</th>
                  <th>Product</th>
                </tr>
              </thead>
              <tbody>
                {userCards
                  .sort((a, b) => {
                    const dateA = new Date(a.purchasedAt || a.createdAt)
                    const dateB = new Date(b.purchasedAt || b.createdAt)
                    return dateB - dateA
                  })
                  .map((card) => (
                    <tr key={card._id}>
                      <td>
                        <button
                          className="my-cards__view-button"
                          onClick={() => handleRowClick(card)}
                        >
                          View
                        </button>
                      </td>
                      <td className="my-cards__cell my-cards__cell--date">
                        {format(
                          new Date(card.purchasedAt || card.createdAt),
                          'MMM dd, yyyy HH:mm',
                        )}
                      </td>
                      <td className="my-cards__cell my-cards__cell--mono">
                        {card.password}
                      </td>
                      <td className="my-cards__cell my-cards__cell--mono">
                        {card.cardNo}
                      </td>
                      <td className="my-cards__cell">{card.product}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyCards
