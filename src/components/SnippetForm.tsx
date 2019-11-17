import React from 'react';

const tomlStream = require('toml-stream');

interface FormState {
  name?: string,
  body?: string,
  prefix?: string,
  description?: string,
}

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
    this.export = this.export.bind(this);
  }

  handleChange(e: any) {
    this.setState({[e.target.name]: e.target.value});
  }

  export(e: any) {
    console.log('exported toml:');
    tomlStream.toTOMLString(this.state, (er: any, output: string) => {
      if (er) throw er
      console.log(output)
    })
  }

  render() {
    return (
      <div className="form-wrapper">
        <input type="text" style={{ height: '100%', width: '100%' }} name="name" value={this.state.name} onChange={this.handleChange} />
        <input type="text" style={{ height: '100%', width: '100%' }} name="prefix" value={this.state.prefix} onChange={this.handleChange} />
        <textarea style={{ height: '100%', width: '100%' }} name="description" value={this.state.description} onChange={this.handleChange} />
        <textarea style={{ height: '100%', width: '100%' }} name="body" value={this.state.body} onChange={this.handleChange} />
        <button onClick={this.export}>export</button>
      </div>
    )
  }
}
