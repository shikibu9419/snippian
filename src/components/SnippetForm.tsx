import React from 'react';
import { saveFile } from '@/utils/FileSystem';
import Snippet from '@/models/Snippet';
import { SnippetsState } from '@/reducers/SnippetsReducer';
import { SnippetsActions } from '@/containers/SnippetForm';


interface FormState {
  name?: string;
  description?: string;
  prefix?: string;
  body?: string;
}

type Props =  SnippetsState & SnippetsActions;

const tomlStream = require('toml-stream');
const spaceCount = 4;
var shiftPressed = false;


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
  state = {
    name: '',
    body: '',
    prefix: '',
    description: '',
  };

  handleChange = (e: any) => (this.setState({[e.target.name]: e.target.value}));

  handleKeyDown = (e:any) => {
    if (e.key === 'Shift') {
      shiftPressed = true;
    }

    if (e.key === 'Tab' && e.keyCode !== 229) {
      e.preventDefault();

//       const textareaElement = e.target;
//       const currentText = textareaElement.value;
//
//       const start = textareaElement.selectionStart;
//       const end = textareaElement.selectionEnd;
//
//       const substitution = Array(spaceCount + 1).join(' ');
//
//       const newText = currentText.substring(0, start) + substitution + currentText.substring(end, currentText.length);
//
//       this.setState({
//         text: newText,
//       }, () => {
//         textareaElement.setSelectionRange(start + spaceCount, start + spaceCount);
//       });
    }
  };


  handleKeyUp = (e: any) => {
    if (e.key === 'Shift') {
      shiftPressed = false;
    }
  };

  exportToToml = (e: any) => {
    console.log(this.props)
    this.props.addSnippet!('latex', this.state);

    tomlStream.toTOMLString(this.state, (error: any, output: string) => {
      if (error) {
        throw error;
      }
      saveFile('hoge.toml', output);
    })
  };

  render() {
    return (
      <div className="form-wrapper">
        <input type="text" style={{ height: '100%', width: '100%' }} name="name" value={this.state.name} onChange={this.handleChange} />
        <input type="text" style={{ height: '100%', width: '100%' }} name="prefix" value={this.state.prefix} onChange={this.handleChange} />
        <input type="text" style={{ height: '100%', width: '100%' }} name="description" value={this.state.description} onChange={this.handleChange} />
        <textarea style={{ height: '100%', width: '100%' }} name="body" value={this.state.body} onChange={this.handleChange} onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp} />
        <button onClick={this.exportToToml}>export</button>
      </div>
    )
  }
}
