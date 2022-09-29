import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'


import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { SSRProvider } from 'react-bootstrap'

function MyApp({ Component, pageProps }: AppProps) {
  return <SSRProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </SSRProvider>


}

export default MyApp
