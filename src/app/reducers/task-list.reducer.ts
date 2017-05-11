import * as models from '../domain';
import { createSelector } from 'reselect';
import * as actions from '../actions/task-list.action';

export interface State{
  taskLists: models.TaskList[]
}

const initialState: State = {
  taskLists: []
};

interface TaskState{
  projects: {byId: any, ids: string[]};
  lists: {byId: any, ids: string[]};
  tasks: {byId: any, ids: string[]};
  users: {byId: any, ids: string[]};
}

export function reducer(
  state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.ActionTypes.ADD_SUCCESS:
      return Object.assign({}, state, 
      {taskLists: [...state.taskLists, action.payload]});
    case actions.ActionTypes.DELETE_SUCCESS:
      return Object.assign({}, state, 
      {taskLists: state.taskLists.filter(tl => tl.id !== action.payload.id)});
    case actions.ActionTypes.UPDATE_SUCCESS:
      const tl_update = state.taskLists.map(tl => {
        if(tl.id === action.payload.id) {
          return Object.assign({}, action.payload);
        } else {
          return tl;
        }
      });
      return Object.assign({}, state, {taskLists: tl_update});
    case actions.ActionTypes.LOADS_SUCCESS:
      return Object.assign({}, state, {taskLists: [...action.payload]});
    case actions.ActionTypes.LOADS_FAIL:
    case actions.ActionTypes.ADD_FAIL:
    case actions.ActionTypes.UPDATE_FAIL:
    case actions.ActionTypes.DELETE_FAIL:
    default:
      return state;
  }
}

export const getTaskLists = (state) => state.taskLists;