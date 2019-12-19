import { AppState } from '../store';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { updateSnippet } from '@/actions/SnippetsActions';
import Snippet from '@/models/Snippet';
import SnippetForm from '@/components/SnippetForm';


export interface OwnState {
  extension: string;
}

export interface SnippetsActions {
  updateSnippet?: (e: string, s: Snippet) => Action<string>;
}

function mapStateToProps(appState: AppState) {
  return {
    snippets: appState.snippets,
    extension: appState.sidebar.selected,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action<string>>) {
  return {
    updateSnippet: (extension: string, snippet: Snippet) => dispatch(updateSnippet(extension, snippet))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SnippetForm);
