import {createAsyncThunk} from '@reduxjs/toolkit'
import {FetchParamsTypes, InitialStateTypes} from '../types'
import axios from 'axios'

export const fetchFilms = createAsyncThunk(
    'kinopoisk/fetchFilms',
    async function (_, {getState, rejectWithValue}) {
        const {kinopoisk} = getState() as {kinopoisk: InitialStateTypes}
        const {
            selectedCountry,
            selectedGenre,
            selectedRating,
            selectedYears,
            currentPageResponse,
        } = kinopoisk

        const fetchParams: FetchParamsTypes = {
            ratingFrom: selectedRating[0],
            ratingTo: selectedRating[1],
            yearFrom: selectedYears[0],
            yearTo: selectedYears[1],
            order: 'NUM_VOTE',
            page: currentPageResponse
        }

        if (selectedCountry.id !== 0) fetchParams.country = selectedCountry.id
        if (selectedGenre.id !== 0) fetchParams.genre = selectedGenre.id
        try {
            const response = await axios({
                url: `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-filters`,
                params: fetchParams,
                headers: {
                    'X-API-KEY': 'b7f13992-d5e9-4deb-a225-1692bcdd1f07'
                    // 9cf1fa82-1cb3-4ab0-b073-f34c936caf95
                }
            })

            let responseOK = response && response.status === 200

            if (!responseOK) {
                debugger
            }
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)