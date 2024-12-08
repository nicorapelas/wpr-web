import ngrokApi from '../api/ngrok'
import createDataContext from './createDataContext'

// Reducer
const CardsReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true, error: null }
    case 'ADD_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'FETCH_CARDS':
      return { ...state, cards: action.payload, loading: false }
    case 'FETCH_AVAILABLE_CARDS':
      return { ...state, availableCards: action.payload, loading: false }
    case 'UPDATE_CARD':
      return {
        ...state,
        cards: state.cards.map((card) =>
          card._id === action.payload._id ? action.payload : card,
        ),
        loading: false,
      }
    case 'ADD_CARDS':
      return {
        ...state,
        cards: [...state.cards, ...action.payload],
        loading: false,
        error: null,
      }
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    default:
      return state
  }
}

// Actions
const fetchCards = (dispatch) => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/cards')
    if (response.data.error) {
      dispatch({ type: 'ADD_ERROR', payload: response.data.error })
      return
    }
    dispatch({ type: 'FETCH_CARDS', payload: response.data })
  } catch (error) {
    dispatch({ type: 'ADD_ERROR', payload: 'Could not fetch cards' })
    console.log(error)
  }
}

const fetchAvailableCards = (dispatch) => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/cards/available')
    if (response.data.error) {
      dispatch({ type: 'ADD_ERROR', payload: response.data.error })
      return
    }
    dispatch({ type: 'FETCH_AVAILABLE_CARDS', payload: response.data })
  } catch (error) {
    dispatch({ type: 'ADD_ERROR', payload: 'Could not fetch available cards' })
    console.log(error)
  }
}

const useCard = (dispatch) => async (cardId) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post(`/cards/${cardId}/use`)
    if (response.data.error) {
      dispatch({ type: 'ADD_ERROR', payload: response.data.error })
      return
    }
    dispatch({ type: 'UPDATE_CARD', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'ADD_ERROR', payload: 'Could not use card' })
    console.log(error)
  }
}

const createBatch = (dispatch) => async (batchData) => {
  dispatch({ type: 'LOADING' })
  try {
    const { quantity, product } = batchData
    const timestamp = Date.now()
    const batchCode = `BATCH${timestamp}`

    // Create array of card objects
    const cardBatch = Array.from({ length: quantity }, (_, index) => ({
      product,
      cardNo: `${batchCode}-${(index + 1).toString().padStart(4, '0')}`,
      account: '',
      password: generatePassword(), // We'll create this function
      status: 'created',
    }))

    const response = await ngrokApi.post('/cards/batch', {
      cards: cardBatch,
    })

    if (response.data.error) {
      dispatch({ type: 'ADD_ERROR', payload: response.data.error })
      return null
    }

    dispatch({ type: 'ADD_CARDS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'ADD_ERROR', payload: 'Failed to create card batch' })
    console.log(error)
    return null
  }
}

const generatePassword = () => {
  // Generate a 16-character password
  const chars = '0123456789'
  return Array.from(
    { length: 16 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join('')
}

const createCardBatch = (dispatch) => async (cards) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post('/cards/batch', { cards })
    if (response.data.error) {
      let errorMessage = response.data.error
      if (response.data.duplicates) {
        errorMessage += '\n' + response.data.duplicates.join('\n')
      }
      dispatch({ type: 'ADD_ERROR', payload: errorMessage })
      return null
    }

    dispatch({ type: 'ADD_CARDS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({
      type: 'ADD_ERROR',
      payload: error.response?.data?.error || 'Failed to create card batch',
    })
    console.log(error)
    return null
  }
}

const clearError = (dispatch) => async () => {
  dispatch({ type: 'CLEAR_ERROR' })
}

export const { Provider, Context } = createDataContext(
  CardsReducer,
  {
    fetchCards,
    fetchAvailableCards,
    useCard,
    createBatch,
    createCardBatch,
    clearError,
  },
  {
    cards: [],
    availableCards: [],
    loading: false,
    error: null,
  },
)
