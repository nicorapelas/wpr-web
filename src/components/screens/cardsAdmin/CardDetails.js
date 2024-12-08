import React from 'react'

const CardDetails = ({ card, onBack }) => {
  if (!card) return null

  return (
    <div className="card-details">
      <div className="card-details-header">
        <h3>Card Details</h3>
        <button className="btn btn-secondary" onClick={onBack}>
          Back to List
        </button>
      </div>

      <div className="card-info">
        <div className="info-row">
          <label>Product:</label>
          <span>{card.product}</span>
        </div>
        <div className="info-row">
          <label>Card No:</label>
          <span>{card.cardNo}</span>
        </div>
        <div className="info-row">
          <label>Password:</label>
          <span>{card.password}</span>
        </div>
        <div className="info-row">
          <label>Status:</label>
          <span className={`status-badge ${card.status}`}>{card.status}</span>
        </div>
        {card.usedBy && (
          <>
            <div className="info-row">
              <label>Used By:</label>
              <span>{card.usedBy}</span>
            </div>
            <div className="info-row">
              <label>Used At:</label>
              <span>{new Date(card.usedAt).toLocaleString()}</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CardDetails
