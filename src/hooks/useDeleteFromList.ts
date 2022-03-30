import { useAppDispatch, useAppSelector } from './redux'
import { FilmTypes, TypeListTypes } from '../types'
import { excludeMovingFilmsFromList } from '../features/excludeMovingFilmsFromList'
import { kinopoiskSlice } from '../store/kinopoiskSlice'
import { getListFromLocalStorage } from '../features/getFavoritesListFromLocalStorage'
import { convertFormatListFilms } from '../features/convertFormatListFilms'
import { BLACK_LIST, FAVORITES_LIST } from '../constants'

export default function useDeleteFromList(typeList: TypeListTypes) {
    const {listFilms, listIDsMovedFilms} = useAppSelector(state => state.kinopoisk)
    const {changeFavoritesList, changeBlackList} = kinopoiskSlice.actions
    const dispatch = useAppDispatch()

    function deleteFromList() {
        // Преобразование массива Id фильмов в массив фильмов
        const deleteFilms = listIDsMovedFilms.map(i => listFilms.find(y => y.filmId === i)!)

        // Удаляю выбранные фильмы из листа
        const selectedList = getListFromLocalStorage(typeList)
        const newList: FilmTypes[] = excludeMovingFilmsFromList(selectedList, deleteFilms)
        localStorage.setItem(typeList, JSON.stringify(newList))

        // Преобразование формата записи стран и жанров для отображении в таблице
        const convertedList = convertFormatListFilms(newList)
        if (typeList === FAVORITES_LIST) dispatch(changeFavoritesList(convertedList))
        if (typeList === BLACK_LIST) dispatch(changeBlackList(convertedList))
    }

    return {deleteFromList}

}