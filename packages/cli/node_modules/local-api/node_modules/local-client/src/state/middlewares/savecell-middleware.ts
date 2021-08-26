import { Dispatch } from "redux";
import { Action } from "../actions";
import { ActionType } from "../action-types";
import { saveCells } from "../action-creators";
import { RootState } from "../reducers";

export const saveCellMiddleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => {
  let timer: any;
  return (next: (action: Action) => void) => {
    return (action: Action) => {
      next(action);

      if (
        [
          ActionType.MOVE_CELL,
          ActionType.DELETE_CELL,
          ActionType.INSERT_CELL_AFTER,
          ActionType.UPDATE_CELL,
        ].includes(action.type)
      ) {

        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          // because saveCells() uses redux thunk
          saveCells()(dispatch, getState);
        }, 300);
      }
    };
  };
};

// use of this middleware: Want to dispatch an additional action after recieving all the actions
