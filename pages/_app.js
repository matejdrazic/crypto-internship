import '../styles/globals.css'
import Layout from '../components/layout.js'

function MyApp({ Component, pageProps }) {
  return (
    <div>
        <Component {...pageProps} />
    </div>
  )
}

export default MyApp
