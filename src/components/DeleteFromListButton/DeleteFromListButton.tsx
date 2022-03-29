import styles from './DeleteFromListButton.module.scss'
import { Button } from '@mui/material'
import useDeleteFromList from '../../hooks/useDeleteFromList'
import { TypeListTypes } from '../../types'

import { BLACK_LIST, FAVORITES_LIST } from '../../constants'
import CachedIcon from '@mui/icons-material/Cached';

type PropsTypes = {
    typeList: TypeListTypes
}
function DeleteFromListButton({typeList}: PropsTypes) {
    const {deleteFromList} = useDeleteFromList(typeList)
    return (
        <div className={styles._}>
            <Button
                className={styles.button}
                startIcon={<CachedIcon/>}
                onClick={deleteFromList}
                variant="contained"
            >
                {typeList === FAVORITES_LIST && 'Восстановить показы в поиске'}
                {typeList === BLACK_LIST && 'Удалить из блэк-листа'}
            </Button>
        </div>
    )
}

export default DeleteFromListButton