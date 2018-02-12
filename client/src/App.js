import React, { Component } from 'react';
import io from 'socket.io-client';
import './App.css';

import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';
import UsersList from './components/UsersList';
import UserForm from './components/UserForm';
const socket = io('http://localhost:9000'); //apply your server address

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      messages: [],
      text: '',
      name: ''
    }
  }

  componentDidMount() {
    socket.on('message', message => this.messageReceive(message));
    socket.on('update', ({users}) => this.chatUpdate(users));
    socket.on('deleteMsg', msg => this.deleteMsgRecieve(msg));
  }

  deleteMsg(prop) {
    socket.emit('deleteMsg', prop);
  }

  deleteMsgRecieve(prop) {
    const updatemsg = this.state.messages.filter(test => test.time !== prop);
    this.setState({messages: updatemsg});
  }

  messageReceive(message) {
    const messages = [message, ...this.state.messages];
    this.setState({messages});
  }

  chatUpdate(users) {
    this.setState({users});
  }

  handleMessageSubmit(message) {
    const messages = [message, ...this.state.messages];
    this.setState({messages});
    socket.emit('message', message);
  }

  handleUserSubmit(name) {
    this.setState({name});
    socket.emit('join', name);
  }

  renderUserForm() {

    return (<UserForm onUserSubmit={name => this.handleUserSubmit(name)} />)
  }

  renderLayout() {
    
    return (
      <div className="App">
        <div className="AppHeader">
          <div className="AppTitle">
            ChatApp
          </div>
          <div className="AppRoom">
            App room
          </div>
        </div>
        <div className="AppBody">
          <UsersList users={this.state.users}/>
          <div className="MessageWrapper">
            <MessageList messages={this.state.messages} name={this.state.name} deleteMsg={msg => this.deleteMsg(msg)}/>
            <MessageForm onMessageSubmit={message => this.handleMessageSubmit(message)} name={this.state.name} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    return this.state.name !== '' ? this.renderLayout() : this.renderUserForm();
  }
}

export default App;
