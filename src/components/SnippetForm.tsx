import React from 'react';
import { SnippetsState } from '@/reducers/SnippetsReducer';
import { SnippetsActions } from '@/containers/SnippetForm';
import { exportAsToml } from '@/services/ExportService';
import { getIndentedTextElem } from '@/utils/FormExtension';

interface FormState {
  name?: string;
  description?: string;
  prefix?: string;
  body?: string;
}

type Props = SnippetsState & SnippetsActions;

//// function component ver.
// const SnippetForm: React.SFC<Props> = (props: React.PropsWithChildren<Props>) => {
//   return (
//     <div className="form-wrapper">
//       <input type="text" style={{ height: '100%', width: '100%' }} name="name" value={props.snippet.name} onChange={(e) => props.inputForm(e)} />
//       <input type="text" style={{ height: '100%', width: '100%' }} name="prefix" value={props.snippet.prefix} onChange={(e) => props.inputForm(e)} />
//       <input type="text" style={{ height: '100%', width: '100%' }} name="description" value={props.snippet.description} onChange={(e) => props.inputForm(e)} />
//       <textarea style={{ height: '100%', width: '100%' }} name="body" value={props.snippet.body} onChange={(e) => props.inputForm(e)} />
//       <button onClick={(e) => exportToToml(props.snippets)}>export</button>
//     </div>
//   );
// }
//
// export default SnippetForm;


export default class SnippetForm extends React.Component<Props, FormState> {
  shiftPressed = false;

  state = {
    name: '',
    body: '',
    prefix: '',
    description: '',
  };

  handleChange = (e: any) => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleKeyDown = (e:any) => {
    if (e.key === 'Shift') {
      this.shiftPressed = true;
    }

    if (e.key === 'Tab' && e.keyCode !== 229) {
      e.preventDefault();

      const elem = e.target;
      const newElem = getIndentedTextElem(elem, this.shiftPressed);

      this.setState(
        {
          body: newElem.text
        },
        () => {
          elem.setSelectionRange(...newElem.selectionRange);
        }
      );
    }
  };


  handleKeyUp = (e: any) => {
    if (e.key === 'Shift') {
      this.shiftPressed = false;
    }
  };

  exportData = (e: any) => {
    this.props.addSnippet!('latex', this.state);
    console.log(this.props)
    exportAsToml(this.props.snippets);
  };

  render() {
    return (
      <div className="form-wrapper">
        <input type="text" style={{ height: '100%', width: '100%' }} name="name" value={this.state.name} onChange={this.handleChange} />
        <input type="text" style={{ height: '100%', width: '100%' }} name="prefix" value={this.state.prefix} onChange={this.handleChange} />
        <input type="text" style={{ height: '100%', width: '100%' }} name="description" value={this.state.description} onChange={this.handleChange} />
        <textarea style={{ height: '100%', width: '100%' }} name="body" value={this.state.body} onChange={this.handleChange} onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp} />
        <button onClick={this.exportData}>export</button>
      </div>
    )
  }
}
