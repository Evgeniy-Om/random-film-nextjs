import {useDispatch} from 'react-redux'
import {useAppSelector} from '../hooks/redux'
import {kinopoiskSlice} from '../store/kinopoiskSlice'
import {Slider} from '@mui/material'

const marks = [
   {
      value: 0,
      label: "0"
   },
   {
      value: 10,
      label: "10"
   }
]

function RatingSlider() {
   const {selectedRating} = useAppSelector(state => state.kinopoisk)
   const {changeNumPageResponse, disableButton, isNewFilters, selectRating} = kinopoiskSlice.actions
   const dispatch = useDispatch()

   const handleChange = (event: Event, value: number | number[]) => {
      dispatch(selectRating(value as [number, number]))
      dispatch(isNewFilters(true))
      dispatch(changeNumPageResponse())
      dispatch(disableButton(false))
   }

   return (
       <div className="slider-wrapper">
         <div className="slider-title">Рейтинг</div>
         <Slider
            value={[selectedRating[0], selectedRating[1]]}
            onChange={handleChange}
            marks={marks}
            valueLabelDisplay="auto"
            getAriaLabel={() => "рейтинг"}
            getAriaValueText={() => `${selectedRating} рейтинг`}
            min={marks[0].value}
            max={marks[1].value}
         />
      </div>
   )
}

export default RatingSlider