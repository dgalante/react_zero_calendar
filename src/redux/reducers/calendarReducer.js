import moment from "moment";
import { types } from "../types/types";

const initialState = {
    events: [
        {
            id: new Date().getTime(),
            start: moment().toDate(),
            end: moment().add(2, "hours").toDate(),
            title: 'Evento default',
            bgcolor: '#fafafa',
            notes: 'Comprar el pastel',
            user: {
                _id: '123',
                name: 'Diego'
            } 
        }
    ],
    activeEvent: null
}

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.EVENT_SET_ACTIVE:            
            return {
                ...state,
                activeEvent: action.payload
            }
        case types.EVENT_ADD_NEW:
            return {
                ...state,
                events: [...state.events, action.payload]
            }
        case types.EVENT_UPDATE:
            return {
                ...state,
                events: state.events.map( event => (
                    (event.id === action.payload.id) ?
                    action.payload : event
                ))
            }
        case types.EVENT_DELETE:
            return {
                ...state,
                events: state.events.filter(e => e.id !== state.activeEvent.id ),
                activeEvent: null
            }       
        default:
            return state;
    }
}