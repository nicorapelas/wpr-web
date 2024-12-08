import ngrokApi from '../api/ngrok'
import createDataContext from './createDataContext'

// Reducer
const CommonReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true }
    case 'GET_COUPON':
      return { ...state, coupon: action.payload, loading: false }
    default:
      return state
  }
}

// Actions
const getCoupon = (dispatch) => async (data) => {
  dispatch({ type: 'LOADING' })
  const response = await ngrokApi.post(`/coupon`, data)
  dispatch({ type: 'GET_COUPON', payload: response.data })
}

export const { Provider, Context } = createDataContext(
  CommonReducer,
  {
    getCoupon,
  },
  {
    loading: false,
    coupon: false,
  },
)
