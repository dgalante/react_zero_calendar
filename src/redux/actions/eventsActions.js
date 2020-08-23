import { types } from "../types/types"

export const eventAddNew = (event) => {
    event.id = new Date().getTime();
    return {
        type: types.EVENT_ADD_NEW,
        payload: event
    }
}

export const eventSetActive = (event) => {
    return {
        type: types.EVENT_SET_ACTIVE,
        payload: event
    }
}

export const eventUpdate = (event) => {
    return {
        type: types.EVENT_UPDATE,
        payload: event
    }
}

export const eventDelete = () => {
    return {
        type: types.EVENT_DELETE
    }
}