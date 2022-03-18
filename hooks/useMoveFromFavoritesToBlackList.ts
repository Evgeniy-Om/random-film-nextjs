import { useAppDispatch, useAppSelector } from './redux'
import { listFilmsTypes } from '../types'
import { excludeMovingFilmsFromList } from '../features/excludeMovingFilmsFromList'
import { kinopoiskSlice } from '../store/kinopoiskSlice'

function useMoveFromFavoritesToBlackList() {
    const {listFilms, listIDsMovedFilms} = useAppSelector(state => state.kinopoisk)
    const {changeWhiteList} = kinopoiskSlice.actions
    const dispatch = useAppDispatch()

    function moveFromFavoritesToBlackList() {
        // Преобразование массива Id фильмов в массив фильмов
        const movingFilms = listIDsMovedFilms.map(i => listFilms.find(y => y.filmId === i)!)

        // Добавляю перемещенные фильмы в blacklist
        const blackList: listFilmsTypes = JSON.parse(localStorage.getItem('blacklist') || '[]')
        const updatedBlackList = blackList.concat(movingFilms)
        localStorage.setItem('blacklist', JSON.stringify(updatedBlackList))

        // Удаляю перемещаемые фильмы из whitelist'a
        const whiteList: listFilmsTypes = JSON.parse(localStorage.getItem('whitelist') || '[]')
        const newList: listFilmsTypes = excludeMovingFilmsFromList(whiteList, movingFilms)
        localStorage.setItem('whitelist', JSON.stringify(newList))


        // if (typeof window !== 'undefined') {
        //     listFilms = JSON.parse(localStorage.getItem('whitelist') || '[]')
        // }

        // Преобразую список фильмов в формат подходящий для отображения в таблице
        const rowsTable = newList.map(f => ({
            ...f,
            countries: f.countries.map((c, i) => i === 0 ? c.country : ` ${c.country}`).toString(),
            genres: f.genres.map((g, i) => i === 0 ? g.genre : ` ${g.genre}`).toString(),

        }))
        dispatch(changeWhiteList(rowsTable))
    }

    return {moveFromFavoritesToBlackList}

}

export default useMoveFromFavoritesToBlackList