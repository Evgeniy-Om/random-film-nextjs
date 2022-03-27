import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import GenreSelect from '../GenreSelect'
import NameFilm from '../NameFilm/NameFilm'
import CountrySelect from '../CountrySelect'
import YearsSlider from '../YearsSlider'
import Poster from '../Poster/Poster'
import RandomFilmButton from '../RandomFilmButton/RandomFilmButton'
import { useAppSelector } from '../../hooks/redux'
import { kinopoiskSlice } from '../../store/kinopoiskSlice'
import styles from './App.module.scss'
import BackButton from '../BackButton/BackButton'
import AddToWhiteListButton from '../AddToWhiteListButton/AddToWhiteListButton'
import AddToBlackListButton from '../AddToBlackListButton/AddToBlackListButton'
import Counter from '../Counter/Counter'
import RatingSlider from '../RatingSlider'
import Navbar from "../Navbar/Navbar";

function App() {
    const {error} = useAppSelector(state => state.kinopoisk)
    const {shuffle} = kinopoiskSlice.actions
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(shuffle())
    }, [])

    return (

        <div className={styles.wrapper}>
            <Navbar/>
            <div className={styles.container}>
                <div className={styles.filmWrapper}>
                    <Poster/>
                    <NameFilm/>
                </div>
                <div className={styles.mainButtonsContainer}>
                    <BackButton/>
                    <RandomFilmButton/>
                    <Counter/>
                </div>
                <div className={styles.listsButtonsContainer}>
                    <AddToWhiteListButton/>
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

export default App
