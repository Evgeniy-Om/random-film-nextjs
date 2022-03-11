import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { setupStore } from '../store/store'
import { StyledEngineProvider } from '@mui/styled-engine'
import { Provider } from 'react-redux'

function MyApp({Component, pageProps}: AppProps) {
    return <Provider store={setupStore()}>
        <StyledEngineProvider injectFirst>
            <Component {...pageProps} />
        </StyledEngineProvider>
    </Provider>

}

export default MyApp
