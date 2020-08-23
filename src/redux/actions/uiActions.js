import { types } from "../types/types"

export const uiOpenModal = () => {
    return {
        type: types.UI_OPEN_MODAL
    }
}

export const uiCloseModal = () => {
    return {
        type: types.UI_CLOSE_MODAL
    }
}