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
    case 'SET_CONFIRM_PURCHASE':
      return { ...state, confirmPurchase: action.payload }
    case 'SET_PAYMENT_TRIGGERED':
      return { ...state, paymentTriggered: action.payload }
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
    const response = await ngrokApi.post('/payment/create-payment', paymentData)
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

const setPaymentTriggered = (dispatch) => (value) => {
  dispatch({ type: 'SET_PAYMENT_TRIGGERED', payload: value })
}

const clearPaymentData = (dispatch) => () => {
  dispatch({ type: 'CLEAR_PAYMENT_DATA' })
}

const setConfirmPurchase = (dispatch) => (value) => {
  dispatch({ type: 'SET_CONFIRM_PURCHASE', payload: value })
}

export const { Context, Provider } = createDataContext(
  yocoReducer,
  {
    clearError,
    initiatePayment,
    clearPaymentData,
    setConfirmPurchase,
    setPaymentTriggered,
  },
  {
    loading: false,
    errorMessage: null,
    paymentData: null,
    confirmPurchase: false,
    paymentTriggered: false,
  },
)
