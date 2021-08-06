import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";

interface CellsState {
    loading: boolean;
    error: string | null;
    order: string[];
    data: {
       [key: string]: Cell
    }
}

const initialState: CellsState = {
    loading: false,
    error: null,
    order: [],
    data: {}
}

const cellsReducer = (state: CellsState = initialState, action: Action): CellsState => {
    const { MOVE_CELL, DELETE_CELL, INSERT_CELL_BEFORE, UPDATE_CELL } = ActionType

    switch(action.type) {
        case MOVE_CELL:
            return state;
        case DELETE_CELL:
            return state;
        case INSERT_CELL_BEFORE:
            return state;

        case UPDATE_CELL:
            const { id, content} = action.payload
            return {
                ...state,
                data: {
                    ...state.data, 
                    [id]: {
                        ...state.data[id],
                        content: content
                    } 
                }
            }
            
        default:
            return state;
    }
}

export default cellsReducer;