import React, { useContext } from 'react'
import { FaPencilAlt } from 'react-icons/fa'

import { Context as CommonContext } from '../../../context/CommonContext'
import { Context as AuthContext } from '../../../context/AuthContext'

import './dashboard.css'

const UserInfo = () => {
  const { setFormModalShow, setFormSelected } = useContext(CommonContext)

  const {
    state: { loading, user },
  } = useContext(AuthContext)

  const handleEditUserInfo = () => {
    setFormModalShow(true)
    setFormSelected('userInfo')
  }

  return (
    <div className="user-info">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <button className="edit-button" onClick={handleEditUserInfo}>
            <FaPencilAlt />
          </button>
          <div className="user-info-header">
            <h2>User Information</h2>
          </div>
          <div className="user-info-details">
            <p>Email: {user?.email}</p>
            <p>Company: {user?.company}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default UserInfo
