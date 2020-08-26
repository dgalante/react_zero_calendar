import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startRemoveEvent } from '../../redux/actions/eventsActions';

export const DeleteEventFab = () => {

    const dispatch = useDispatch();
    const { activeEvent } = useSelector(state => state.calendar);

    const handleFabClick = () => {
        dispatch( startRemoveEvent( activeEvent ) );
    }

    return (
        <button className="btn btn-danger fab fab-danger" 
            onClick={ handleFabClick }>
            <i className="fas fa-trash" />
            <span> Borrar</span>
        </button>
    )
}