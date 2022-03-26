
// Тасование Фишера — Йетса
// https://learn.javascript.ru/task/shuffle

import { listFilmsTypes } from '../types'

function shuffleListFilms(array: listFilmsTypes) {
   for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
   }
   return array
}

export default shuffleListFilms