import { AppState } from '../store';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { addSnippet } from '@/actions/SnippetsActions';
import Snippet from '@/models/Snippet';
import SnippetForm from '@/components/SnippetForm';


export interface SnippetsActions {
  addSnippet?: (e: string, s: Snippet) => Action<string>;
}

function mapStateToProps(appState: AppState) {
  return { snippets: appState.snippets };
}

function mapDispatchToProps(dispatch: Dispatch<Action<string>>) {
  return {
    addSnippet: (extension: string, snippet: Snippet) => dispatch(addSnippet(extension, snippet))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SnippetForm);
