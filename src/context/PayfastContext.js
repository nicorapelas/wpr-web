import ngrokApi from '../api/ngrok'
import createDataContext from './createDataContext'

const payFastReducer = (state, action) => {
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
  try {
    dispatch({ type: 'SET_LOADING' })
    const response = await ngrokApi.post(
      '/payment/payfast/initiate',
      paymentData,
    )
    dispatch({ type: 'SET_PAYMENT_DATA', payload: response.data })
  } catch (error) {
    dispatch({
      type: 'SET_ERROR',
      payload:
        error.response?.data?.message ||
        'Something went wrong with payment initiation',
    })
  }
}

const verifyPayment = (dispatch) => async (token) => {
  try {
    dispatch({ type: 'SET_LOADING' })
    const response = await ngrokApi.get(`/payment/payfast/verify/${token}`)
    dispatch({ type: 'SET_PAYMENT_DATA', payload: response.data })
  } catch (error) {
    dispatch({
      type: 'SET_ERROR',
      payload: error.response?.data?.message || 'Payment verification failed',
    })
  }
}

export const { Context, Provider } = createDataContext(
  payFastReducer,
  {
    clearError,
    initiatePayment,
    verifyPayment,
  },
  {
    loading: false,
    errorMessage: null,
    paymentData: null,
  },
)
