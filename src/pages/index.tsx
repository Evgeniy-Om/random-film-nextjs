import dynamic from 'next/dynamic'
import React, { ReactElement } from 'react'
import Layout from '../layout/Layout'

const HomePageComponent = dynamic(
    () => import('../page-components/home/HomePageComponent'),
    {ssr: false}
)

export default function HomePage() {
    return <HomePageComponent/>
}

HomePage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}


