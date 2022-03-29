import { useAppDispatch, useAppSelector } from './redux'
import { filmTypes } from '../types'
import { excludeMovingFilmsFromList } from '../features/excludeMovingFilmsFromList'
import { kinopoiskSlice } from '../store/kinopoiskSlice'
import { getListFromLocalStorage } from '../features/getFavoritesListFromLocalStorage'
import { convertFormatListFilms } from '../features/convertFormatListFilms'
import { BLACK_LIST, FAVORITES_LIST } from '../constants'

function useMoveFromFavoritesToBlackList() {
    const {listFilms, listIDsMovedFilms} = useAppSelector(state => state.kinopoisk)
    const {changeFavoritesList} = kinopoiskSlice.actions
    const dispatch = useAppDispatch()

    function moveFromFavoritesToBlackList() {
        // Преобразование массива Id фильмов в массив фильмов
        const movingFilms = listIDsMovedFilms.map(i => listFilms.find(y => y.filmId === i)!)

        // Добавляю перемещенные фильмы в blacklist
        const blackList: filmTypes[] = JSON.parse(localStorage.getItem(BLACK_LIST) || '[]')
        const updatedBlackList = blackList.concat(movingFilms)
        localStorage.setItem(BLACK_LIST, JSON.stringify(updatedBlackList))

        // Удаляю перемещаемые фильмы из FavoritesList'a
        const favoritesList = getListFromLocalStorage(FAVORITES_LIST)
        const newList: filmTypes[] = excludeMovingFilmsFromList(favoritesList, movingFilms)
        localStorage.setItem(FAVORITES_LIST, JSON.stringify(newList))

        // Преобразование формата записи стран и жанров для отображении в таблице
        const convertedList = convertFormatListFilms(newList)
        dispatch(changeFavoritesList(convertedList))
        // if (typeof window !== 'undefined') {
        //     listFilms = JSON.parse(localStorage.getItem(FAVORITES_LIST) || '[]')
        // }

    }

    return {moveFromFavoritesToBlackList}

}

export default useMoveFromFavoritesToBlackList