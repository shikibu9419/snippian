import { SnippetsActions, ActionTypes } from '@/actions/SnippetsActions';
import Snippet from '@/models/Snippet';

export interface SnippetsState {
  [extension: string]: { [name: string]: Snippet };
}

export function snippetsReducer(snippetsState: SnippetsState = {}, action: SnippetsActions) {
  switch (action.type) {
    case ActionTypes.UPDATE_SNIPPET:
      const extension: string = action.payload.extension;
      const snippet = action.payload.snippet;
      return {
        ...snippetsState,
        [extension]: {
          ...snippetsState[extension],
           [snippet.name]: snippet
        }
      };
    default:
      return snippetsState;
  }
}
