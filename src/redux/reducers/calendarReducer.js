import { types } from "../types/types";

const initialState = {
    events: [],
    activeEvent: null
}

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.EVENT_LIST: 
            return {
                ...state,
                events: action.payload
            }                
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