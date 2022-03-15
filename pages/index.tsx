import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const App = dynamic(() => import('../components/App/App'), {ssr: false})

const Home: NextPage = () => {

    return (
        <>
            <Head>
                <title>Генератор случайных фильмов</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <App/>
        </>
    )
}

export default Home
