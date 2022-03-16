import { useAppSelector } from './redux'
import { kinopoiskSlice } from '../store/kinopoiskSlice'
import { useDispatch } from 'react-redux'

function useAddToList(typeList: "whitelist" | "blacklist") {
    const {currentFilmNumber, listFilms, counter} = useAppSelector(state => state.kinopoisk)
    const {changeCurrentFilmNumber, changeCounter, deleteCurrentFilmFromList} = kinopoiskSlice.actions
    const dispatch = useDispatch()

    function addToList () {
        // Записываю в localStorage
        let filmsInBlackList = JSON.parse(localStorage.getItem(typeList) || '[]')
        let updatedBlackList = filmsInBlackList.concat(listFilms[currentFilmNumber])
        localStorage.setItem(typeList, JSON.stringify(updatedBlackList))

        dispatch(changeCurrentFilmNumber(currentFilmNumber + 1))
        dispatch(changeCounter(counter-1))
        dispatch(deleteCurrentFilmFromList())
    }

    return {addToList}

}

export default useAddToList