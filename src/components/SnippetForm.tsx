import React from 'react';
import { saveFile } from '@/utils/FileSystem'

const tomlStream = require('toml-stream');

interface FormState {
  name?: string;
  body?: string;
  prefix?: string;
  description?: string;
}

const spaceCount = 4;
var shiftPressed = false;

export default class SnippetForm extends React.Component<{}, FormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: '',
      body: '',
      prefix: '',
      description: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.export = this.export.bind(this);
  }

  handleChange(e: any) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleKeyDown(e: any) {
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
  }

  handleKeyUp(e: any) {
    if (e.key === 'Shift') {
      shiftPressed = false;
    }
  }

  export(e: any) {
    tomlStream.toTOMLString(this.state, (error: any, output: string) => {
      if (error) {
        throw error;
      }
      saveFile('hoge.toml', output);
    })
  }

  render() {
    return (
      <div className="form-wrapper">
        <input type="text" style={{ height: '100%', width: '100%' }} name="name" value={this.state.name} onChange={this.handleChange} />
        <input type="text" style={{ height: '100%', width: '100%' }} name="prefix" value={this.state.prefix} onChange={this.handleChange} />
        <input type="text" style={{ height: '100%', width: '100%' }} name="description" value={this.state.description} onChange={this.handleChange} />
        <textarea style={{ height: '100%', width: '100%' }} name="body" value={this.state.body} onChange={this.handleChange} onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp} />
        <button onClick={this.export}>export</button>
      </div>
    )
  }
}
