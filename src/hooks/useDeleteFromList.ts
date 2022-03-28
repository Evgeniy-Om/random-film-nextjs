import { useAppDispatch, useAppSelector } from './redux'
import { listFilmsTypes } from '../types'
import { excludeMovingFilmsFromList } from '../features/excludeMovingFilmsFromList'
import { kinopoiskSlice } from '../store/kinopoiskSlice'
import { getListFromLocalStorage } from '../features/getWhiteListFromLocalStorage'
import { convertFormatListFilms } from '../features/convertFormatListFilms'

export default function useDeleteFromList() {
    const {listFilms, listIDsMovedFilms} = useAppSelector(state => state.kinopoisk)
    const {changeWhiteList} = kinopoiskSlice.actions
    const dispatch = useAppDispatch()

    function deleteFromList() {
        // Преобразование массива Id фильмов в массив фильмов
        const movingFilms = listIDsMovedFilms.map(i => listFilms.find(y => y.filmId === i)!)

        // Удаляю перемещаемые фильмы из whitelist'a
        const whiteList = getListFromLocalStorage('whitelist')
        const newList: listFilmsTypes = excludeMovingFilmsFromList(whiteList, movingFilms)
        localStorage.setItem('whitelist', JSON.stringify(newList))

        const convertedList = convertFormatListFilms(newList)
        dispatch(changeWhiteList(convertedList))
        // if (typeof window !== 'undefined') {
        //     listFilms = JSON.parse(localStorage.getItem('whitelist') || '[]')
        // }


    }

    return {deleteFromList}

}