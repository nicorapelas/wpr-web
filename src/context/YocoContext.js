import createDataContext from './createDataContext'
import ngrokApi from '../api/ngrok'

const yocoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: true }
    case 'CLEAR_LOADING':
      return { ...state, loading: false }
    case 'SET_ERROR':
      return { ...state, errorMessage: action.payload, loading: false }
    case 'CLEAR_ERROR':
      return { ...state, errorMessage: null }
    case 'SET_PAYMENT_DATA':
      return { ...state, paymentData: action.payload, loading: false }
    case 'CLEAR_PAYMENT_DATA':
      return { ...state, paymentData: null }
    default:
      return state
  }
}

const clearError = (dispatch) => () => {
  dispatch({ type: 'CLEAR_ERROR' })
}

const initiatePayment = (dispatch) => async (paymentData) => {
  console.log(`paymentData`, paymentData)
  try {
    dispatch({ type: 'SET_LOADING' })
    const response = await ngrokApi.post('/payment/create-payment', paymentData)
    console.log(`response`, response.data)
    dispatch({
      type: 'SET_PAYMENT_DATA',
      payload: {
        ...response.data,
        paymentInitiated: true,
      },
    })
    return response.data
  } catch (error) {
    dispatch({
      type: 'SET_ERROR',
      payload: error.response?.data?.message || 'Payment initiation failed',
    })
    throw error
  }
}

const clearPaymentData = (dispatch) => () => {
  dispatch({ type: 'CLEAR_PAYMENT_DATA' })
}

export const { Context, Provider } = createDataContext(
  yocoReducer,
  {
    clearError,
    initiatePayment,
    clearPaymentData,
  },
  {
    loading: false,
    errorMessage: null,
    paymentData: null,
  },
)
