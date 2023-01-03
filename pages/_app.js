import '../styles/globals.css'
import '../styles/autocomplete.min.css'

import { AuthContextProvider } from '../AuthContext'

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}
