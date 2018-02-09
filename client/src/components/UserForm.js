import React, {Component} from 'react';
import './UserForm.css';

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {name: ''};
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onUserSubmit(this.state.name);
    }

    handleChange(e) {
        this.setState({name: e.target.value});
    }

    render() {
        return(
            <form className="UserForm" onSubmit={e => this.handleSubmit(e)}>
                <input
                    className="UserInput"
                    placeholder="Type in your nick and press enter"
                    onChange={e => this.handleChange(e)}
                    value={this.state.name}
                />
            </form>
        );
    }
}

export default UserForm;