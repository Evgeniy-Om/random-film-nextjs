import { useAppSelector } from './redux'
import { kinopoiskSlice } from '../store/kinopoiskSlice'
import { useDispatch } from 'react-redux'

function useAddFilmToListInStorage(typeList: "whitelist" | "blacklist") {
    const {currentFilmNumber, listFilms, counter} = useAppSelector(state => state.kinopoisk)
    const {changeCurrentFilmNumber, changeCounter, deleteCurrentFilmFromList} = kinopoiskSlice.actions
    const dispatch = useDispatch()

    function addFilmToMyList () {
        // Записываю в localStorage
        const filmsInList = JSON.parse(localStorage.getItem(typeList) || '[]')
        const updatedList = filmsInList.concat(listFilms[currentFilmNumber])
        localStorage.setItem(typeList, JSON.stringify(updatedList))

        dispatch(changeCurrentFilmNumber(currentFilmNumber + 1))
        dispatch(changeCounter(counter-1))

        //Удаляют из общего листа текущий фильм
        dispatch(deleteCurrentFilmFromList())
    }

    return {addFilmToMyList}

}

export default useAddFilmToListInStorage