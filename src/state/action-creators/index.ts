import { CellTypes } from "../cell";
import { ActionType } from "../action-types";
import {
  Action,
  MoveCellAction,
  DeleteCellAction,
  InsertCellBeforeAction,
  UpdateCellAction,
  CellDirections
} from "../actions";

export const moveCell = (id: string, cellDirection: CellDirections): MoveCellAction => {
    return {
        type: ActionType.MOVE_CELL,
        payload: {
            id,
            direction: cellDirection
        }
    }
};

export const deleteCell = (id: string): DeleteCellAction => {
    return {
        type: ActionType.DELETE_CELL,
        payload: id
    }
};

export const insertCellBefore = (id: string, cellType: CellTypes): InsertCellBeforeAction => {
    return {
        type: ActionType.INSERT_CELL_BEFORE,
        payload: {
            id,
            type: cellType
        }
    }
};

export const updateCell = (id: string, content: string): UpdateCellAction => {
    return {
        type: ActionType.UPDATE_CELL,
        payload: {
            id,
            content
        }
    }
};
