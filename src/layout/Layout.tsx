// components/layout.js

import React from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar/Navbar'

type PropsTypes = {
    children: React.ReactChild
    title?: string
}

export default function Layout({children, title = ''}: PropsTypes) {
    return (
        <>
            <Head>
                <title>{title ? `${title} - генератор`: "Генератор"} случайных фильмов</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta name="keywords" content="Генератор случайных фильмов, рандомазер фильмов, случайный фильм"/>
            </Head>
            <Navbar/>
            <main>{children}</main>
            {/*<Footer />*/}
        </>
    )
}