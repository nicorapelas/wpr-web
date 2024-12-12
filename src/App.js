import React from 'react'
import { Provider as AuthProvider } from './context/AuthContext'
import { Provider as CommonProvider } from './context/CommonContext'
import { Provider as YocoProvider } from './context/YocoContext'
import { Provider as CardsProvider } from './context/CardsContext'
import AppRouter from './AppRouter'

function App() {
  return (
    <AuthProvider>
      <CommonProvider>
        <YocoProvider>
          <CardsProvider>
            <AppRouter />
          </CardsProvider>
        </YocoProvider>
      </CommonProvider>
    </AuthProvider>
  )
}

export default App
