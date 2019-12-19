import React from 'react';
import { SnippetsState } from '@/reducers/SnippetsReducer';
import { SnippetsActions, OwnState } from '@/containers/SnippetForm';
import { exportAsToml } from '@/services/ExportService';
import { getIndentedTextElem } from '@/utils/FormExtension';
import { debounce } from 'lodash';

interface FormState {
  name?: string;
  description?: string;
  prefix?: string;
  body?: string;
}

type Props = SnippetsState & OwnState & SnippetsActions;

const SnippetForm: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {
  const [snippet, setSnippet] = React.useState({
    name: '',
    body: '',
    prefix: '',
    description: '',
  });

  const [shiftPressed, setShiftPressed] = React.useState(false)

  const debouncedHandleChange = debounce((target: any) => {
    setSnippet({...snippet, [target.name]: target.value});
    props.updateSnippet!(props.extension, snippet);
  }, 300);

  const handleChange = React.useCallback((e: any) => debouncedHandleChange(e.target), []);

  const handleKeyDown = (e:any) => {
    if (e.key === 'Shift') {
      setShiftPressed(true);
    }

    if (e.key === 'Tab' && e.keyCode !== 229) {
      e.preventDefault();

      const elem = e.target;
      const newElem = getIndentedTextElem(elem, shiftPressed);

      setSnippet(
        {
          ...snippet,
          body: newElem.text
        },
//         () => {
//           elem.setSelectionRange(...newElem.selectionRange);
//         }
      );
    }
  };

  const handleKeyUp = (e: any) => {
    if (e.key === 'Shift') {
      setShiftPressed(false);
    }
  };

  const exportData = (e: any) => {
    exportAsToml(props.snippets);
  };

  return (
      <div className="form-wrapper">
        <input type="text" style={{ height: '100%', width: '100%' }} name="name" value={snippet.name} onChange={handleChange} />
        <input type="text" style={{ height: '100%', width: '100%' }} name="prefix" value={snippet.prefix} onChange={handleChange} />
        <input type="text" style={{ height: '100%', width: '100%' }} name="description" value={snippet.description} onChange={handleChange} />
        <textarea style={{ height: '100%', width: '100%' }} name="body" value={snippet.body} onChange={handleChange} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />
        <button onClick={exportData}>export</button>
      </div>
  )
}

export default SnippetForm;
