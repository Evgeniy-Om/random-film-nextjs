import React, { ReactElement, useEffect } from 'react'
import Layout from '../layout/Layout'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { kinopoiskSlice } from '../store/kinopoiskSlice'
import { getListFromLocalStorage } from '../features/getFavoritesListFromLocalStorage'
import { BLACK_LIST } from '../constants'
import { convertFormatListFilms } from '../features/convertFormatListFilms'
import styles from '../styles/ListPage.module.scss'
import DeleteFromListButton from '../components/DeleteFromListButton/DeleteFromListButton'
import MoveToFavoritesButton from '../components/MoveToFavoritesButton/MoveToFavoritesButton'
import { DataGrid } from '../components/DataGrid/DataGrid'

export default function BlackListPage() {
    const {blackList} = useAppSelector(state => state.kinopoisk)
    const {changePageSize, changeBlackList} = kinopoiskSlice.actions
    const dispatch = useAppDispatch()

    useEffect(() => {
        const blackListFromStorage = getListFromLocalStorage(BLACK_LIST)
        const convertedList = convertFormatListFilms(blackListFromStorage)
        dispatch(changeBlackList(convertedList))

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
                <h1 className={styles.title}>Блэк-лист</h1>
                <div className={styles.buttonsContainer}>
                    <DeleteFromListButton typeList={BLACK_LIST}/>
                    <MoveToFavoritesButton/>
                </div>
            </div>
            <DataGrid listFilms={blackList}/>
        </div>
    )
}

BlackListPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout title="Блэк-лист">
            {page}
        </Layout>
    )
}


