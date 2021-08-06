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

const CellReducer = (state: CellsState = initialState, action: Action): CellsState => {
    const { type, payload} = action
    
    switch(type) {
        default:
            return state;
    }
}

export default CellReducer;