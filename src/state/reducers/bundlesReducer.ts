import produce from "immer";
import bundle from "../../bundler";
import { ActionType } from "../action-types";
import { Action } from "../actions";

interface BundlesState {
    [key: string]: {
        loading: boolean; // currently bundling code or not
        code: string;
        err: string;
    }
}

const initialState: BundlesState = {};

const bundlesReducer = produce(
    ( 
    state: BundlesState = initialState,
    action: Action
    ): BundlesState => {

    switch(action.type) {
        case ActionType.BUNDLE_START:
            state[action.payload.cellId] = {
                loading: true,
                code: "",
                err: ""
            }
            return state;
        case ActionType.BUNDLE_COMPLETE:
            state[action.payload.cellId] = {
                loading: false,
                code: action.payload.bundle.code,
                err: action.payload.bundle.err
            }
            return state;
        default:
            return state;
    }
}, initialState);

export default bundlesReducer;