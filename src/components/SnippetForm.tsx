import React from 'react';
import { SnippetsState } from '@/reducers/SnippetsReducer';
import { SnippetsActions } from '@/containers/SnippetForm';
import { exportAsToml } from '@/services/ExportService';

interface FormState {
  name?: string;
  description?: string;
  prefix?: string;
  body?: string;
}

type Props = SnippetsState & SnippetsActions;

const spaceCount = 4;

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

  handleChange = (e: any) => (this.setState({[e.target.name]: e.target.value}));

  handleKeyDown = (e:any) => {
    if (e.key === 'Shift') {
      this.shiftPressed = true;
    }

    if (e.key === 'Tab' && e.keyCode !== 229) {
      e.preventDefault();

      const element = e.target;
      const currentText = element.value;
      let start = element.selectionStart;
      let end = element.selectionEnd;

      let head = currentText.slice(0, start);
      let middle = currentText.slice(start, end);
      const tail = currentText.slice(end);

      const indent = Array(spaceCount + 1).join(' ');
      const nearestLFIndex = head.lastIndexOf('\n');

      if (this.shiftPressed) {
        const matchHead = new RegExp('^' + indent, 'g');
        const matchLF = new RegExp('\n' + indent, 'g');
        const insertCount = (middle.match(matchLF) || []).length;

        head = nearestLFIndex >= 0
          ? head.slice(0, nearestLFIndex) + head.slice(nearestLFIndex).replace(matchLF, '\n')
          : head.replace(matchHead, '');
        middle = middle.replace(matchLF, '\n');

        start -= spaceCount;
        end -= insertCount * spaceCount;
      } else {
        const insertIndex = nearestLFIndex + 1;
        const deleteCount = (middle.match(/\n/g) || []).length + 1;

        head = head.slice(0, insertIndex) + indent + head.slice(insertIndex);
        middle = middle.replace(/\n/g, '\n' + indent);

        start += spaceCount;
        end += deleteCount * spaceCount;
      }

      this.setState(
        {
          body: head + middle + tail
        },
        () => {
          element.setSelectionRange(start, end);
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
