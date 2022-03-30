import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { setupStore } from '../store/store'
import { StyledEngineProvider } from '@mui/styled-engine'
import { Provider } from 'react-redux'
import { ReactElement, ReactNode, useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function MyApp({Component, pageProps}: AppPropsWithLayout) {
    const router = useRouter().route
    const getLayout = Component.getLayout || ((page) => page)
    useEffect(() => {
        if (router === '/favorites' || router === '/blacklist') {
            document.body.className = 'show-scroll'
        } else {
            document.body.className = ''
        }
    })
    return (
        <Provider store={setupStore()}>
            <StyledEngineProvider injectFirst>
                {getLayout(<Component {...pageProps} />)}
            </StyledEngineProvider>
        </Provider>
    )

}

export default MyApp
