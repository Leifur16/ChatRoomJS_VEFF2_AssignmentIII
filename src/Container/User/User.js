import React from 'react';
import { PropTypes} from 'prop-types';

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            value : '',
            userNames: [],
        };
    }

    validateAndConfirm() {
        const{ socket } = this.context;
        socket.emit('adduser', this.state.value, (loggedIn) => {
            console.log(loggedIn);
            if(loggedIn) {
            socket.emit('joinroom', {room:'lobby'}, (joinedLobby, reason) => {
              if(joinedLobby) {
                console.log('successful');
              }
              else {
                console.log(reason);
              }
            });
            }
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
    socket: PropTypes.object.isRequired
};

export default User;
