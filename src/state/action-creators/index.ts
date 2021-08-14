import { Dispatch } from "redux";
import { CellTypes } from "../cell";
import { ActionType } from "../action-types";
import bundle from "../../bundler";
import {
  MoveCellAction,
  DeleteCellAction,
  InsertCellAfterAction,
  UpdateCellAction,
  CellDirections,
  BundleStartAction,
  BundleCompleteAction,
  Action
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

export const insertCellAfter = (id: string | null, cellType: CellTypes): InsertCellAfterAction => {
    return {
        type: ActionType.INSERT_CELL_AFTER,
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

export const createBundle = (cellId: string, input: string) => {
    return async(dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.BUNDLE_START,
            payload: {
                cellId,
            },
        });
        const result = await bundle(input);
        
        dispatch({
            type: ActionType.BUNDLE_COMPLETE,
            payload: {
                cellId,
                bundle: {
                    code: result.code,
                    err: result.err
                }
            },
        });
    };
};