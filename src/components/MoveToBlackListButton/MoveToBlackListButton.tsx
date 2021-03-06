import styles from './MoveToBlackListButton.module.scss'
import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { kinopoiskSlice } from '../../store/kinopoiskSlice'
import { FilmTypes } from '../../types'
import { BLACK_LIST, FAVORITES_LIST } from '../../constants'
import { getListFromLocalStorage } from '../../features/getFavoritesListFromLocalStorage'
import { excludeMovingFilmsFromList } from '../../features/excludeMovingFilmsFromList'
import { convertFormatListFilms } from '../../features/convertFormatListFilms'

function MoveToBlackListButton() {
    const {listFilms, listIDsMovedFilms} = useAppSelector(state => state.kinopoisk)
    const {changeFavoritesList} = kinopoiskSlice.actions
    const dispatch = useAppDispatch()

    const handleClick = () => {
        // Преобразование массива Id фильмов в массив фильмов
        const movingFilms = listIDsMovedFilms.map(i => listFilms.find(y => y.filmId === i)!)

        // Добавляю перемещенные фильмы в BlackList
        const blackList: FilmTypes[] = JSON.parse(localStorage.getItem(BLACK_LIST) || '[]')
        const updatedBlackList = blackList.concat(movingFilms)
        localStorage.setItem(BLACK_LIST, JSON.stringify(updatedBlackList))

        // Удаляю перемещаемые фильмы из FavoritesList'a
        const favoritesList = getListFromLocalStorage(FAVORITES_LIST)
        const newList: FilmTypes[] = excludeMovingFilmsFromList(favoritesList, movingFilms)
        localStorage.setItem(FAVORITES_LIST, JSON.stringify(newList))

        // Преобразование формата записи стран и жанров для отображении в таблице
        const convertedList = convertFormatListFilms(newList)
        dispatch(changeFavoritesList(convertedList))
    }

    return (
        <div className={styles._}>
            <Button
                className={styles.button}
                startIcon={<DeleteIcon/>}
                onClick={handleClick}
                variant="contained"
                color="error"
            >
                Переместить в блэк-лист
            </Button>
        </div>
    )
}

export default MoveToBlackListButton