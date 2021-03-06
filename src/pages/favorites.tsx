import React, { ReactElement, useEffect } from 'react'
import Layout from '../layout/Layout'
import { FAVORITES_LIST } from '../constants'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { kinopoiskSlice } from '../store/kinopoiskSlice'
import { getListFromLocalStorage } from '../features/getFavoritesListFromLocalStorage'
import { convertFormatListFilms } from '../features/convertFormatListFilms'
import styles from '../styles/ListPage.module.scss'
import DeleteFromListButton from '../components/DeleteFromListButton/DeleteFromListButton'
import MoveToBlackListButton from '../components/MoveToBlackListButton/MoveToBlackListButton'
import { DataGrid } from '../components/DataGrid/DataGrid'

export default function FavoritesPage() {
    const {favoritesList} = useAppSelector(state => state.kinopoisk)
    const {changePageSize, changeFavoritesList} = kinopoiskSlice.actions
    const dispatch = useAppDispatch()

    useEffect(() => {
        const favorites = getListFromLocalStorage(FAVORITES_LIST)
        const convertedList = convertFormatListFilms(favorites)
        dispatch(changeFavoritesList(convertedList))

        const pageSize = localStorage.getItem('pageSize')
        let resultNumber
        if (pageSize) {
            resultNumber = Number(JSON.parse(pageSize))
            dispatch(changePageSize(resultNumber))
        }
    }, [])

    return (
        <div className={styles._}>
            <div className={styles.flexContainer}>
                <h1 className={styles.title}>Избранное</h1>
                <div className={styles.buttonsContainer}>
                    <DeleteFromListButton typeList={FAVORITES_LIST}/>
                    <MoveToBlackListButton/>
                </div>
            </div>
            <DataGrid listFilms={favoritesList}/>
        </div>
    )
}

FavoritesPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout title="Избранное">
            {page}
        </Layout>
    )
}


