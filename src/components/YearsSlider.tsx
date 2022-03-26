import {useDispatch} from 'react-redux'
import {useAppSelector} from '../hooks/redux'
import {kinopoiskSlice} from '../store/kinopoiskSlice'
import {Slider} from '@mui/material'

const thisYear = (new Date()).getFullYear()
const marks = [
   {
      value: 1920,
      label: "1920"
   },
   {
      value: thisYear,
      label: `${thisYear}`
   }
]

function YearsSlider() {
   const {selectedYears} = useAppSelector(state => state.kinopoisk)
   const {changeNumPageResponse, disableButton, isNewFilters, selectYears} = kinopoiskSlice.actions
   const dispatch = useDispatch()

   const handleChange = (event: Event, value: number | number[]) => {
      dispatch(selectYears(value as [number, number]))
      dispatch(isNewFilters(true))
      dispatch(changeNumPageResponse())
      dispatch(disableButton(false))
   }

   return (
       <div className="slider-wrapper">
         <div className="slider-title">Год</div>
         <Slider
            value={[selectedYears[0], selectedYears[1]]}
            onChange={handleChange}
            marks={marks}
            valueLabelDisplay="auto"
            getAriaLabel={() => "диапазон лет"}
            getAriaValueText={() => `${selectedYears} год`}
            min={marks[0].value}
            max={marks[1].value}
         />
      </div>
   )
}

export default YearsSlider