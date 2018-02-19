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
        this.state = {
            confirm : false,
            userName: '',
            selectedRoom: 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.getUserName = this.getUserName.bind(this);
        this.getSelectedRoom = this.getSelectedRoom.bind(this);
        const socket = socketClient('http://localhost:8080');
        this._socket = socket;
    }
    getChildContext() {
        return {
            socket: this._socket
        };
    }

    handleChange(con)  {
        this.setState({confirm: con});
    }
    getSelectedRoom(room) {
        this.setState({selectedRoom: room});
    }

    getUserName(user) {
        this.setState({userName: user});
    }

    render() {
        if(this.state.confirm) {
            return(
                <div>
                    <NavBar className="NavBar"/>
                    <div className="container">
                        <div className="ChatList-container">
                            <ChatList room = {this.getSelectedRoom} user = {this.state.userName} />
                        </div>
                        <div className="chat-container">
                            <ChatWindow room = {this.state.selectedRoom} />
                        </div>
                    </div>
                </div>
            )
        }else {
            return <div><User onUser= {this.handleChange} giveUser = {this.getUserName}/></div>
        }
    }
}

App.childContextTypes = {
    socket: PropTypes.object.isRequired
};

ReactDOM.render(<App />, document.getElementById('app'));
