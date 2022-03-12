import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/redux'
import { Skeleton } from '@mui/material'
import styles from './Poster.module.scss'
import ImageNJS from 'next/image'

function Poster() {
    const {currentFilmNumber, listFilms, status} = useAppSelector(state => state.kinopoisk)
    const [imageLoaded, setImageLoaded] = useState(false)

    const src = listFilms[currentFilmNumber].posterUrlPreview
    const image = new Image()
    image.src = src

    useEffect(() => {
        setImageLoaded(false)
        image.onload = () => setImageLoaded(true)
    }, [src])

    return (<div className={styles._}>
            <a href="#" className={!imageLoaded ? 'disabled' : styles.link}>
                <ImageNJS src={src}
                          className={styles.image}
                          layout="fill"
                          objectFit="contain"
                          loading="eager"
                          priority
                />
            </a>
            <Skeleton
                className={!imageLoaded ? styles.skeleton : 'disabled'}
                width="250px"
                height="100%"
                variant="rectangular"
                animation="wave"
            />
        </div>)
}

export default Poster