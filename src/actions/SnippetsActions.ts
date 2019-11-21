import { Action } from 'redux';
import Snippet from '@/models/Snippet';

export enum ActionTypes {
  ADD_SNIPPET = 'ADD_SNIPPET'
}

interface AddSnippetAction extends Action {
  type: ActionTypes.ADD_SNIPPET;
  payload: {
    extension: string;
    snippet: Snippet;
  };
}

export const addSnippet = (
  extension: string,
  snippet: Snippet
): AddSnippetAction => ({
  type: ActionTypes.ADD_SNIPPET,
  payload: { extension, snippet }
});

export type SnippetsActions = AddSnippetAction;
