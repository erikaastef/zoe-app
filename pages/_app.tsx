import type { AppProps } from 'next/app'

import { ThemeProvider } from 'styled-components'

import { GlobalStyle } from '../styles/Global'
import { ResetStyle } from '../styles/Reset'
import { myTheme } from '../styles/Theme'

import store, { persistor } from '../redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={myTheme}>
          <ResetStyle />
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}
export default MyApp
