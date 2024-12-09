import React from 'react'
import { Provider as AuthProvider } from './context/AuthContext'
import { Provider as CommonProvider } from './context/CommonContext'
import { Provider as PayfastProvider } from './context/PayfastContext'
import { Provider as YocoProvider } from './context/YocoContext'
import { Provider as CardsProvider } from './context/CardsContext'
import AppRouter from './AppRouter'

function App() {
  return (
    <AuthProvider>
      <CommonProvider>
        <PayfastProvider>
          <YocoProvider>
            <CardsProvider>
              <AppRouter />
            </CardsProvider>
          </YocoProvider>
        </PayfastProvider>
      </CommonProvider>
    </AuthProvider>
  )
}

export default App
