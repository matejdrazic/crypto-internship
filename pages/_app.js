import '../styles/globals.css'
import Mode from '../components/Shared/Mode'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Mode>
        <Component {...pageProps} />
      </Mode>
    </div>
  )
}

export default MyApp
