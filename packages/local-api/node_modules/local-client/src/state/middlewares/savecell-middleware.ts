import { Dispatch } from "redux"
import { Action } from "../actions"
import { ActionType } from "../action-types"
import { saveCellsError } from "../action-creators";

export const saveCellMiddleware = ({ dispatch }: { dispatch: Dispatch<Action>}) => {
    return (next: (action: Action) => void) => {
        return (action: Action) => {
            next(action);
        };
    };
};

// use of this middleware: Want to dispatch an additional action after recieving all the actions