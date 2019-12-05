import { createStore, combineReducers } from 'redux';
import { snippetsReducer, SnippetsState } from '@/reducers/SnippetsReducer';
import { sidebarReducer, SidebarState } from '@/reducers/SidebarReducer';

export type AppState = {
  snippets: SnippetsState,
  sidebar: SidebarState,
};

const store = createStore(
  combineReducers<AppState>({
    snippets: snippetsReducer,
    sidebar: sidebarReducer
  })
);

export default store;
