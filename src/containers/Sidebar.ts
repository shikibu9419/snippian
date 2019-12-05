import { AppState } from '../store';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { addExtension, selectExtension } from '@/actions/SidebarActions';
import Sidebar from '@/components/Sidebar';


export interface SidebarActions {
  addExtension?: (e: string) => Action<string>;
  selectExtension?: (e: string) => Action<string>;
}

function mapStateToProps(appState: AppState) {
  return appState.sidebar;
}

function mapDispatchToProps(dispatch: Dispatch<Action<string>>) {
  return {
    addExtension: (extension: string) => dispatch(addExtension(extension)),
    selectExtension: (extension: string) => dispatch(selectExtension(extension)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
