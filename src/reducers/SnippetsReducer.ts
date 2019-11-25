import { Action } from 'redux';
import { SnippetsActions, ActionTypes } from '@/actions/SnippetsActions';
import Snippet from '@/models/Snippet';

export interface SnippetsState {
  [extension: string]: Snippet[];
}

export function snippetsReducer(snippetsState: SnippetsState = {}, action: SnippetsActions) {
  switch (action.type) {
    case ActionTypes.ADD_SNIPPET:
      const extension: string = action.payload.extension;
      return {
        ...snippetsState,
        [extension]: (snippetsState[extension] || []).concat([action.payload.snippet])
      };
    default:
      return snippetsState;
  }
}
