import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/redux'
import { Skeleton } from '@mui/material'
import styles from './Poster.module.scss'
import ImageNJS from 'next/image'

function Poster() {
    const {currentFilmNumber, listFilms, status} = useAppSelector(state => state.kinopoisk)
    const [imageLoaded, setImageLoaded] = useState(false)

    const src = listFilms[currentFilmNumber].posterUrlPreview

    useEffect(() => {
            setImageLoaded(false)

            const image = new Image()
            image.src = src
            image.onload = () => {
                setImageLoaded(true)
            }
        }
        , [src])

    return (
        <div className={styles._}>
            <div className={!imageLoaded || status === 'loading' ? 'disabled' : styles.posterContainer}>
                <a href="#" className={styles.link}>
                    <ImageNJS
                        src={src}
                        className={styles.image}
                        layout="fill"
                        objectFit="contain"
                        quality={25}
                        priority
                    />
                </a>
            </div>
            <Skeleton
                className={status === 'loading' ? styles.skeleton : 'disabled'}
                width="240px"
                height="100%"
                variant="rectangular"
                animation="wave"
            />
        </div>
    )
}

export default Poster