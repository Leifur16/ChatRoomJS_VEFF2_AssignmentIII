import React from 'react';
import ReactDOM from 'react-dom';
import User from './User/User';
import '../styles/site';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <User />
        );
    }
}


ReactDOM.render(<App />, document.getElementById('app'));
