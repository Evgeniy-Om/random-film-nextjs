import {useAppSelector} from '../../hooks/redux'
import styles from './NameFilm.module.scss'
import {Skeleton} from '@mui/material'
import React from 'react'

function NameFilm() {
    const {currentFilmNumber, listFilms, status} = useAppSelector(state => state.kinopoisk)
    const {nameRu, year, rating} = listFilms[currentFilmNumber]
    return (
        <div className={styles.root}>
            <div className={!nameRu || status === 'loading' ? "disabled" : styles.wrapper}>
                <span className={styles.nameFilm}>{`${nameRu} (${year})`}</span>
                <span className={styles.rating}>Рейтинг: {rating}</span>
            </div>
            <Skeleton
                className={status === 'loading' ? styles.skeletonName : 'disabled'}
                variant="rectangular"
                animation="wave"
            />
            <Skeleton
                className={status === 'loading' ? styles.skeletonRating : 'disabled'}
                variant="rectangular"
                animation="wave"
            />
        </div>
    )
}

export default NameFilm