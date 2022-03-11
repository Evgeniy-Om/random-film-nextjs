import top250ListFilms from "./top250ListFilms";
import {InitialStateTypes} from '../types'

const initialState: InitialStateTypes = {
    selectedCountry: {id: 0, country: "Все страны"},
    selectedGenre: {id: 0, genre: "Все жанры"},
    selectedYears: [1920, (new Date()).getFullYear()],
    selectedRating: [0, 10],
    currentFilmNumber: 0,
    listFilms: top250ListFilms,
    isChangedFilters: false,
    currentPageResponse: 1,
    totalPagesResponse: 1,
    totalFilteredFilms: 0,
    isDisabledRandomFilmButton: false,
    status: null,
    error: null,
}

export default initialState