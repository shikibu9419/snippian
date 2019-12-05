import { SidebarActions, ActionTypes } from '@/actions/SidebarActions';

export interface SidebarState {
  aliases: { [extension: string]: string[] };
  extensions: string[];
  selected: string;
}

const initialState: SidebarState = {
  aliases: {},
  extensions: ['latex'],
  selected: 'latex',
};

export function sidebarReducer(sidebarState = initialState, action: SidebarActions) {
  switch (action.type) {
    case ActionTypes.ADD_EXTENSION:
      const extensions = sidebarState.extensions;
      return {
        ...sidebarState,
        extensions: extensions.concat(action.payload.extension)
      };
    case ActionTypes.SELECT_EXTENSION:
      return {
        ...sidebarState,
        selected: action.payload.extension
      };
    default:
      return sidebarState;
  }
}
