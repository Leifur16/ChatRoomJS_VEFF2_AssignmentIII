import React from 'react';
import { PropTypes} from 'prop-types';

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            value : '',
            userNames: [],
            confirm: false,
        };
    }

    validateAndConfirm() {
        const{ socket } = this.context;
        socket.emit('adduser', this.state.value, (loggedIn) => {
            console.log(loggedIn);
            this.setState({confirm: true});
            this.props.onUser(this.state.confirm);
            console.log('confirm: ' + this.state.confirm);
        });

        this.setState({value: ''});
    }

    render() {
        const {value} = this.state;
        return (
            <div>
                <input type="text" value = { value} onInput={(e) => this.setState({value: e.target.value})} />
                <button type="button" onClick = {() => this.validateAndConfirm()} >Confirm</button>

            </div>
        );

    }
}

User.contextTypes = {
    socket: PropTypes.object.isRequired,
    confirm: PropTypes.string
};


export default User;
