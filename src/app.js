import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/site';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>Username<input type="text" name="uname"/></div>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('app'));
