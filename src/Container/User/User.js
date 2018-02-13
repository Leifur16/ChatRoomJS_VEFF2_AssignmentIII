import React from 'react';
import { PropTypes} from 'prop-types';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            value : '',
            userNames: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
    }

    validateAndConfirm() {
        const{ socket } = this.context;
        socket.emit('adduser', this.state.value);

        this.setState({value: ''});
    }

    componentDidMount() {
        const{ socket } = this.context;
        socket.on('adduser', (value) => {
            let userNames = Object.assign([], this.state.userNames);
            userNames.push(value);
            this.setState({ userNames });
        });
    }

    render() {
        return (
            <div>
                <input type="text" value = { this.state.value } onInput={(e) => this.setState({value: e.target.value})} />
                <button type="button" onClick = {() => this.validateAndConfirm()} >Confirm</button>
            </div>
        );

    }
}

User.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default User;
