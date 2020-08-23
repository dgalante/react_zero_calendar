import React from 'react'
import { useDispatch } from 'react-redux';
import { eventDelete } from '../../redux/actions/eventsActions';

export const DeleteEventFab = () => {

    const dispatch = useDispatch();

    const handleFabClick = () => {
        dispatch( eventDelete() );
    }

    return (
        <button className="btn btn-danger fab fab-danger" 
            onClick={ handleFabClick }>
            <i className="fas fa-trash" />
            <span> Borrar</span>
        </button>
    )
}