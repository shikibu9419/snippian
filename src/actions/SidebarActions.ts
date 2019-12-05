import { Action } from 'redux';

export enum ActionTypes {
  ADD_EXTENSION = 'ADD_EXTENSION',
  SELECT_EXTENSION = 'SELECT_EXTENSION',
}

interface AddExtensionAction extends Action {
  type: ActionTypes.ADD_EXTENSION;
  payload: {
    extension: string;
  };
}

interface SelectExtensionAction extends Action {
  type: ActionTypes.SELECT_EXTENSION;
  payload: {
    extension: string;
  };
}

export const addExtension = (
  extension: string
): AddExtensionAction => ({
  type: ActionTypes.ADD_EXTENSION,
  payload: { extension }
});

export const selectExtension = (
  extension: string
): SelectExtensionAction => ({
  type: ActionTypes.SELECT_EXTENSION,
  payload: { extension }
});

export type SidebarActions = SelectExtensionAction & AddExtensionAction;
