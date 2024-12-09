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
      return { ...state, availableCards: action.payload, loading: false }
    case 'ADD_CARDS':
      return {
        ...state,
        cards: [...state.cards, ...action.payload],
        loading: false,
        error: null,
      }
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    case 'SET_CARD_TO_BUY':
      return { ...state, cardToBuy: action.payload }
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

const setCardToBuy = (dispatch) => async (data) => {
  dispatch({ type: 'SET_CARD_TO_BUY', payload: data })
}

export const { Provider, Context } = createDataContext(
  CardsReducer,
  {
    fetchCards,
    createCardBatch,
    clearError,
    setCardToBuy,
  },
  {
    cards: [],
    availableCards: [],
    loading: false,
    error: null,
    cardToBuy: null,
  },
)
