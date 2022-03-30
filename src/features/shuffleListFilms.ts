
// Тасование Фишера — Йетса
// https://learn.javascript.ru/task/shuffle

import { FilmTypes} from '../types'

function shuffleListFilms(array: FilmTypes[]) {
   for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
   }
   return array
}

export default shuffleListFilms