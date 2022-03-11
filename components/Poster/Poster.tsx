import React, {useEffect, useRef, useState} from 'react'
import {useAppSelector} from '../../hooks/redux'
import {Skeleton} from '@mui/material'
import styles from './Poster.module.scss'
import Image from 'next/image'

function Poster() {
    const {currentFilmNumber, listFilms, status} = useAppSelector(state => state.kinopoisk)
    const [imageLoaded, setImageLoaded] = useState(false)


    const src = listFilms[currentFilmNumber].posterUrlPreview
    const image = new Image()
    image.src = src

    const refPoster = useRef<HTMLDivElement>(null)
    const heightPoster = refPoster.current?.offsetHeight!
    const [heightImage, setHeightImage] = useState(heightPoster ?? 0)

    let movement_timer: NodeJS.Timeout

    useEffect(() => {
        setImageLoaded(false)
        image.onload = () => setImageLoaded(true)
        // if (isResizedWindow) {
        setHeightImage(heightPoster)
        // }
    }, [src])

    window.addEventListener('resize', () => {
        clearInterval(movement_timer)
        movement_timer = setTimeout(() => {
            if (heightPoster && heightImage !== heightPoster)
                setHeightImage(heightPoster)
        }, 100)
    })

    return (
        <div className={styles._} ref={refPoster}>
            <a href="#" className={!imageLoaded || status === 'loading' ? 'disabled' : styles.link}>
                <img src={src} className={styles.image} width="auto" height={`${heightPoster}px`}/>
                <Image src={src}/>
            </a>
            <Skeleton
                className={!imageLoaded || status === 'loading' ? styles.skeleton : 'disabled'}
                width={heightImage ? heightImage * 0.66 : 0}
                variant="rectangular"
                animation="wave"
            />
        </div>
    )
}

export default Poster