import React from 'react';
import ReactDOM from 'react-dom';
import User from './Container/User/User';
import NavBar from './Navigation/NavBar';
import socketClient from 'socket.io-client';
import '../styles/site';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NavBar />
                <User />
            </div>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('app'));
