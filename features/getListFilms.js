import axios from "axios"
import shuffleListFilms from "./shuffleListFilms";

function getListFilms(countryId, genreId, years, rating) {
   axios({
      url: `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-filters?country=${countryId}&genre=${genreId}&order=RATING&ratingFrom=1&ratingTo=10&yearFrom=1920&yearTo=2021&page=1`,
      headers: {
         'X-API-KEY': 'b7f13992-d5e9-4deb-a225-1692bcdd1f07'
      }
   })
      .then(function (response) {
         // handle success
         console.log(response.data.films)
         const arr = [...response.data.films]
         console.log(shuffleListFilms(arr));
         return arr
      })
}

export default getListFilms