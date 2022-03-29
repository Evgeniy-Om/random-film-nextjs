import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks/redux'
import { kinopoiskSlice } from '../../store/kinopoiskSlice'
import styles from './WatchButton.module.scss'
import { Button } from '@mui/material'
import { BASE_URL_YANDEX } from '../../constants'

export function WatchButton({name = ''}: { name?: string }) {
    const {disableButton} = kinopoiskSlice.actions
    const {currentFilmNumber, listFilms} = useAppSelector(state => state.kinopoisk)
    const {changeCurrentFilmNumber, changeCounter} = kinopoiskSlice.actions
    const dispatch = useDispatch()

    const add_string = 'смотреть онлайн'

    return (
        <div className={styles._}>
            <Button
                className={styles.button}
                href={`${BASE_URL_YANDEX}${name ? name : listFilms[currentFilmNumber].nameRu}+${add_string}`
                        .replace(/ /g, '+')
                }
                target="_blank"
                variant="contained"
            >
                Смотреть
            </Button>
        </div>
    )
}