import { Action } from 'redux';
import { SnippetsActions, ActionTypes } from '@/actions/SnippetsActions';
import Snippet from '@/models/Snippet';

const initialState: SnippetsState = {};

export interface SnippetsState {
  [extension: string]: Snippet[]
}

export function snippetsReducer(state = initialState, action: SnippetsActions) {
  switch (action.type) {
    case ActionTypes.ADD_SNIPPET:
      return {
        ...state,
        snippets: state[action.payload.extension].concat([action.payload.snippet])
      };
    default:
      return state;
  }
}
