import { createStore, combineReducers } from 'redux';
import { snippetsReducer, SnippetsState } from '@/reducers/SnippetsReducer';

export type AppState = {
  snippets: SnippetsState
};

const store = createStore(
  combineReducers<AppState>({
    snippets: snippetsReducer
  })
);

export default store;
