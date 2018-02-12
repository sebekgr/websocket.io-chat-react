import React, {Component} from 'react';
import './MessageForm.css';

class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    handleSubmit(e) {
        e.preventDefault();
        const t = new Date();
        const message = {
            from : this.props.name,
            text: this.state.text,
            time: t.toLocaleTimeString()
        };
        this.props.onMessageSubmit(message);
        this.setState({ text: ''});
    }

    changeHandler(e) {
        this.setState({text: e.target.value});
    }

    render() {
        return(
            <form className="MessageForm" onSubmit={e => this.handleSubmit(e)} >
                <input className="MessageInput"
                    onChange={e => this.changeHandler(e)}
                    value={this.state.text}
                    placeholder='Message'
                />

            </form>
        );
    }
}

export default MessageForm;