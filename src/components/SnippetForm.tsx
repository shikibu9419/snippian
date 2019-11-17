import React from 'react';

interface FormState {
    text: string
}

export default class SnippetForm extends React.Component<{}, FormState> {
    constructor(props: any) {
        super(props);
        this.state = {
            text: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: any) {
        this.setState({text: e.target.value});
    }

    render() {
        return (
            <div className="form-wrapper">
                <textarea style={{ height: '100%', width: '100%' }} value={this.state.text} onChange={this.handleChange} />
            </div>
        )
    }
}
