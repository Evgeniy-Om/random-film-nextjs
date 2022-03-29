import React, { useEffect } from 'react'
import { useAppSelector } from '../../hooks/redux'
import { kinopoiskSlice } from '../../store/kinopoiskSlice'
import { useDispatch } from 'react-redux'
import styles from './HomePageComponent.module.scss'
import Poster from '../../components/Poster/Poster'
import NameFilm from '../../components/NameFilm/NameFilm'
import BackButton from '../../components/BackButton/BackButton'
import RandomFilmButton from '../../components/RandomFilmButton/RandomFilmButton'
import AddToFavoritesListButton from '../../components/AddToFavoritesListButton/AddToFavoritesListButton'
import AddToBlackListButton from '../../components/AddToBlackListButton/AddToBlackListButton'
import CountrySelect from '../../components/CountrySelect'
import GenreSelect from '../../components/GenreSelect'
import { RatingSlider, YearsSlider } from '../../components'
import { WatchButton } from '../../components/WatchButton/WatchButton'


export default function HomePageComponent () {
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
                {error && <h2>Ошибка: {error}</h2>}
                {/* Фильтры поиска*/}
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