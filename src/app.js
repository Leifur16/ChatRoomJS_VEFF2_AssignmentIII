import React from 'react';
import ReactDOM from 'react-dom';
import User from './User/User';
import Chat from './Chat/Chat'
import '../styles/site';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
          <div>
            <User />
            <Chat />
          </div>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('app'));
