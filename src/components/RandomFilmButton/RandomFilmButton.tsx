import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks/redux'
import { kinopoiskSlice } from '../../store/kinopoiskSlice'
import { fetchFilms } from '../../store/kinopoiskAsyncThunks'
import styles from './RandomFilmButton.module.scss'
import { Button } from '@mui/material'
import { useEffect } from 'react'

function RandomFilmButton() {
    const {
        currentFilmNumber,
        counter,
        listFilms,
        isChangedFilters,
        currentPageResponse,
        totalPagesResponse,
        isDisabledRandomFilmButton
    } = useAppSelector(state => state.kinopoisk)

    const {
        changeCurrentFilmNumber,
        changeNumPageResponse,
        disableButton, changeCounter
    } = kinopoiskSlice.actions

    const dispatch = useDispatch()

    useEffect(() => {
        if (isChangedFilters) {
            dispatch(changeNumPageResponse())
        }
    }, [isChangedFilters])

    const handleClick = () => {
        if (isChangedFilters) { // Пользователь поменял фильтры
            try {
                dispatch(fetchFilms())
            } catch (e) {
                console.log(e)
            }
        } else {
            if (currentFilmNumber < listFilms.length - 1) {
                dispatch(changeCurrentFilmNumber(currentFilmNumber + 1))
                dispatch(changeCounter(counter-1))
            }
            if (currentFilmNumber === listFilms.length - 8) { // Подгружаю ещё одну страницу с фильмами с API (до 20 фильмов за раз) и добавляю в имеющийся список фильмов
                if (currentPageResponse < totalPagesResponse) {
                    dispatch(changeNumPageResponse())
                    dispatch(fetchFilms())
                    // console.log(currentPageResponse, ' ', totalPagesResponse)
                }
            }
            if (currentFilmNumber === listFilms.length - 1) {
                dispatch(disableButton(true))
            }
        }

    }

    return (<div className={styles._}>
        <Button
            className={styles.button}
            disabled={isDisabledRandomFilmButton}
            onClick={handleClick}
            variant="contained"
        >
            {isChangedFilters ? <span>Новый поиск</span> : <span>Случайный фильм</span>}
        </Button>
        {/*<CircularProgress*/}
        {/*    className={status === 'loading' ? styles.circular : 'disabled'}*/}
        {/*    size={30}*/}
        {/*/>*/}
    </div>)
}

export default RandomFilmButton