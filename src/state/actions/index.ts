import { ActionType } from "../action-types";

interface MoveCellAction {
  type: ActionType.MOVE_CELL;
}
interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
}
interface InsertCellBeforeAction {
  type: ActionType.INSERT_CELL_BEFORE;
}
interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
}
