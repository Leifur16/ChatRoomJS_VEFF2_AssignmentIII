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
        };
        this.handleChange = this.handleChange.bind(this);
    }

    getChildContext() {
        return {
            socket: socketClient('http://localhost:8080')
        };
    }

    handleChange(con)  {
        console.log('in here!');
        this.setState({confirm: con});
        console.log(this.state.confirm);
    }

    render() {
        return (
            <div>
                { this.state.confirm &&
                    <div>
                        <NavBar className="NavBar"/>
                        <div className="container">
                            <div className="ChatList-container">
                                <ChatList />
                            </div>

                            <button type = "button" onClick = {() => this.whatever()}>get</button>
                            <div className="chat-container">
                                <ChatWindow />
                            </div>
                        </div>
                    </div>
                }
                <User onUser= {this.handleChange}/>
            </div>
        );
    }
}

App.childContextTypes = {
    socket: PropTypes.object.isRequired,
};


ReactDOM.render(<App />, document.getElementById('app'));
