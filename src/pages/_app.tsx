import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { setupStore } from '../store/store'
import { StyledEngineProvider } from '@mui/styled-engine'
import { Provider } from 'react-redux'
import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function MyApp({Component, pageProps}: AppPropsWithLayout) {
    const getLayout = Component.getLayout || ((page) => page)
    return (
            <Provider store={setupStore()}>
                <StyledEngineProvider injectFirst>
                    {getLayout(<Component {...pageProps} />)}
                </StyledEngineProvider>
            </Provider>
    )

}

export default MyApp
