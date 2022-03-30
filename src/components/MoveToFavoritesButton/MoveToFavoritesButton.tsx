import styles from './MoveToFavoritesButton.module.scss'
import { Button } from '@mui/material'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import { FilmTypes } from '../../types'
import { BLACK_LIST, FAVORITES_LIST } from '../../constants'
import { getListFromLocalStorage } from '../../features/getFavoritesListFromLocalStorage'
import { excludeMovingFilmsFromList } from '../../features/excludeMovingFilmsFromList'
import { convertFormatListFilms } from '../../features/convertFormatListFilms'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { kinopoiskSlice } from '../../store/kinopoiskSlice'

function MoveToFavoritesButton() {
    const {listFilms, listIDsMovedFilms} = useAppSelector(state => state.kinopoisk)
    const {changeBlackList} = kinopoiskSlice.actions
    const dispatch = useAppDispatch()

    const handleClick = () => {
        // Преобразование массива Id фильмов в массив фильмов
        const movingFilms = listIDsMovedFilms.map(i => listFilms.find(y => y.filmId === i)!)

        // Добавляю перемещенные фильмы в FavoritesList
        const favoritesList: FilmTypes[] = JSON.parse(localStorage.getItem(FAVORITES_LIST) || '[]')
        const updatedFavoritesList = favoritesList.concat(movingFilms)
        localStorage.setItem(FAVORITES_LIST, JSON.stringify(updatedFavoritesList))

        // Удаляю перемещаемые фильмы из BlackList'a
        const blackList = getListFromLocalStorage(BLACK_LIST)
        const newList: FilmTypes[] = excludeMovingFilmsFromList(blackList, movingFilms)
        localStorage.setItem(BLACK_LIST, JSON.stringify(newList))

        // Преобразование формата записи стран и жанров для отображении в таблице
        const convertedList = convertFormatListFilms(newList)
        dispatch(changeBlackList(convertedList))
    }

    return (
        <div className={styles._}>
            <Button
                className={styles.button}
                startIcon={<PlaylistAddCheckIcon/>}
                onClick={handleClick}
                variant="contained"
                color="success"
            >
                Переместить в избранное
            </Button>
        </div>
    )
}

export default MoveToFavoritesButton