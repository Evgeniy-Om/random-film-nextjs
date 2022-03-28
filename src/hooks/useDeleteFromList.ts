import { useAppDispatch, useAppSelector } from './redux'
import { filmTypes, TypeListTypes } from '../types'
import { excludeMovingFilmsFromList } from '../features/excludeMovingFilmsFromList'
import { kinopoiskSlice } from '../store/kinopoiskSlice'
import { getListFromLocalStorage } from '../features/getWhiteListFromLocalStorage'
import { convertFormatListFilms } from '../features/convertFormatListFilms'

export default function useDeleteFromList(typeList: TypeListTypes) {
    const {listFilms, listIDsMovedFilms} = useAppSelector(state => state.kinopoisk)
    const {changeWhiteList, changeBlackList} = kinopoiskSlice.actions
    const dispatch = useAppDispatch()

    function deleteFromList() {
        // Преобразование массива Id фильмов в массив фильмов
        const deleteFilms = listIDsMovedFilms.map(i => listFilms.find(y => y.filmId === i)!)

        // Удаляю выбранные фильмы из листа
        const selectedList = getListFromLocalStorage(typeList)
        const newList: filmTypes[] = excludeMovingFilmsFromList(selectedList, deleteFilms)
        localStorage.setItem(typeList, JSON.stringify(newList))

        // Преобразование формата записи стран и жанров для отображении в таблице
        const convertedList = convertFormatListFilms(newList)
        if (typeList === 'whitelist') dispatch(changeWhiteList(convertedList))
        if (typeList === 'blacklist') dispatch(changeBlackList(convertedList))
    }

    return {deleteFromList}

}