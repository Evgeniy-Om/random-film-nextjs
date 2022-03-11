import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import shuffleListFilms from '../features/shuffleListFilms'
import initialState from './initialState'
import {fetchFilms} from './kinopoiskAsyncThunks'

export const kinopoiskSlice = createSlice({
        name: 'kinopoisk',
        initialState,
        reducers: {
            selectCountry(state, action: PayloadAction<{ id: number, country: string }>) {
                state.selectedCountry = action.payload
            },
            selectGenre(state, action: PayloadAction<{ id: number, genre: string }>) {
                state.selectedGenre = action.payload
            },
            selectYears(state, action: PayloadAction<[number, number]>) {
                state.selectedYears = action.payload
            },
            selectRating(state, action: PayloadAction<[number, number]>) {
                state.selectedRating = action.payload
            },
            numFilm(state, action: PayloadAction<number>) {
                state.currentFilmNumber = action.payload
            },
            shuffle(state) {
                state.listFilms = shuffleListFilms(state.listFilms)
            },
            isNewFilters(state, action: PayloadAction<boolean>) {
                state.isChangedFilters = action.payload
            },
            changeNumPageResponse(state) {
                (state.isChangedFilters)
                    ? state.currentPageResponse = 1
                    : state.currentPageResponse += 1
            },
            addFilms(state, action) {
                state.listFilms = state.listFilms.concat(action.payload)
            },
            disableButton(state, action) {
                state.isDisabledRandomFilmButton = action.payload
            }
        },
        extraReducers: {
            [fetchFilms.pending.type]: (state) => {
                state.status = 'loading'
                state.error = null
            },
            [fetchFilms.fulfilled.type]: (state, action) => {
                state.status = 'resolved'
                state.totalPagesResponse = action.payload.pagesCount
                if (state.isChangedFilters) {
                    state.listFilms = shuffleListFilms(action.payload.films)
                    console.log(state.listFilms)
                    state.currentFilmNumber = 0
                    state.isChangedFilters = false
                } else {
                    state.listFilms = state.listFilms.concat(shuffleListFilms(action.payload.films))
                    state.isDisabledRandomFilmButton = false
                    console.log(state.listFilms)
                }
            },
            [fetchFilms.rejected.type]: (state, action) => {
                state.status = 'rejected'
                state.error = action.payload
            },
        }
    }
)


export default kinopoiskSlice.reducer