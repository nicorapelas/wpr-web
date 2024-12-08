import { useEffect, useContext } from 'react'
import { Context as AuthContext } from '../context/AuthContext'

const InitDataFetch = () => {
  const {
    state: { user },
  } = useContext(AuthContext)

  useEffect(() => {
    if (user) {
      console.log(`fetch data`)
    }
  }, [user])

  return null
}

export default InitDataFetch
