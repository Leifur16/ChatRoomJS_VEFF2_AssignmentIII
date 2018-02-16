import React from 'react';
import ReactDOM from 'react-dom';
import { PropTypes } from 'prop-types'
import User from './Container/User/User';
import NavBar from './Navigation/NavBar';
import socketClient from 'socket.io-client';
import '../styles/site';
import ChatWindow from './Container/ChatWindow/ChatWindow';
import ChatList from './Container/ChatList/ChatList';

class App extends React.Component {
    componentDidCatch(error, info) {
        console.log(error, info);
    }
    constructor(props) {
        super(props);
    }
    getChildContext() {
        return {
            socket: socketClient('http://localhost:8080')
        };
    }
    render() {
        return (
            <div>
                <NavBar className="NavBar"/>
                <div className="container">
                  <div className="ChatList-container">
                    <ChatList />
                  </div>
                    <User />
                  <div className="chat-container">
                    <div>
                      <ChatWindow />
                    </div>
                  </div>
                </div>
            </div>
        )
    }
}

App.childContextTypes = {
    socket: PropTypes.object.isRequired
};

ReactDOM.render(<App />, document.getElementById('app'));
