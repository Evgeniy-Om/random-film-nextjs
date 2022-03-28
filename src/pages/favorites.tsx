import React, { ReactElement } from 'react'
import Layout from '../layout/Layout'
import FavoritesPageComponent from '../page-components/favorites/FavoritesPageComponent'

export default function FavoritesPage() {
    return <FavoritesPageComponent/>
}

FavoritesPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout title="Избранное">
            {page}
        </Layout>
    )
}


