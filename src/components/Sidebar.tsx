import React from 'react';
import { SidebarState } from '@/reducers/SidebarReducer';
import { SidebarActions } from '@/containers/Sidebar';
import CreatableSelect from 'react-select/creatable';

type Props = SidebarState & SidebarActions;

const Sidebar: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {
  const options = props.extensions.map((e: string) => ({value: e, label: e}));

  const handleChange = (e: any) => {
    if (!e) { return; }

    const extension = e.value;
    if (!props.extensions.includes(extension)) {
      props.addExtension!(extension);
    }
    props.selectExtension!(extension);
  };

  return (
    <div className="sidebar" style={{ height: '100%', width: '30%' }}>
      <h1>Snippian</h1>
      <CreatableSelect
        isClearable
        formatCreateLabel={input => `New extension: ${input}`}
        onChange={handleChange}
        options={options}
        defaultValue={options.find((opt: any) => opt['value'] === props.selected)}
      />
    </div>
  );
}

export default Sidebar;
