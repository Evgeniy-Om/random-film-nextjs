import dynamic from 'next/dynamic'
import React, { ReactElement, useEffect } from 'react'
import Layout from '../layout/Layout'
import { useAppSelector } from '../hooks/redux'
import { kinopoiskSlice } from '../store/kinopoiskSlice'
import { useDispatch } from 'react-redux'
import styles from '../styles/HomePage.module.scss'
import Poster from '../components/Poster/Poster'
import NameFilm from '../components/NameFilm/NameFilm'
import BackButton from '../components/BackButton/BackButton'
import RandomFilmButton from '../components/RandomFilmButton/RandomFilmButton'
import { WatchButton } from '../components/WatchButton/WatchButton'
import AddToFavoritesListButton from '../components/AddToFavoritesListButton/AddToFavoritesListButton'
import AddToBlackListButton from '../components/AddToBlackListButton/AddToBlackListButton'
import CountrySelect from '../components/CountrySelect'
import GenreSelect from '../components/GenreSelect'
import { RatingSlider, YearsSlider } from '../components'

// const HomePageComponent = dynamic(
//     () => import('../page-components/home/HomePageComponent'),
//     {ssr: false}
// )

export default function HomePage() {
    const {error} = useAppSelector(state => state.kinopoisk)
    const {shuffle} = kinopoiskSlice.actions
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(shuffle())
    }, [])

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.filmWrapper}>
                    <Poster/>
                    <NameFilm/>
                </div>
                <div className={styles.mainButtonsContainer}>
                    <BackButton/>
                    <RandomFilmButton/>
                    {/*<Counter/>*/}
                    <WatchButton/>
                </div>
                <div className={styles.listsButtonsContainer}>
                    <AddToFavoritesListButton/>
                    <AddToBlackListButton/>
                </div>
                {error && <h2>????????????: {error}</h2>}
                {/* ?????????????? ????????????*/}
                <div className={styles.filtersWrapper}>
                    <CountrySelect/>
                    <GenreSelect/>
                    <YearsSlider/>
                    <RatingSlider/>
                </div>
            </div>
        </div>
    )
}

HomePage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}


