import React from 'react'
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../redux/actions/uiActions';
import { eventSetActive } from '../../redux/actions/eventsActions';

export const AddNewFab = () => {

    const dispatch = useDispatch();

    const handleFabClick = () => {
        dispatch( eventSetActive(null) );
        dispatch( uiOpenModal() );
    }

    return (
        <button className="btn btn-primary fab fab-plus" 
            onClick={ handleFabClick }>
            <i className="fas fa-plus" />
        </button>
    )
}
