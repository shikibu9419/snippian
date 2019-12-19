import { Action } from 'redux';
import Snippet from '@/models/Snippet';

export enum ActionTypes {
  UPDATE_SNIPPET = 'UPDATE_SNIPPET'
}

interface UpdateSnippetAction extends Action {
  type: ActionTypes.UPDATE_SNIPPET;
  payload: {
    extension: string;
    snippet: Snippet;
  };
}

export const updateSnippet = (
  extension: string,
  snippet: Snippet
): UpdateSnippetAction => ({
  type: ActionTypes.UPDATE_SNIPPET,
  payload: { extension, snippet }
});

export type SnippetsActions = UpdateSnippetAction;
