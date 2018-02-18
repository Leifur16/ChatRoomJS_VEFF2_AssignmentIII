import React from 'react';
import { PropTypes } from 'prop-types';

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            value : '',
            userNames: [],
        };
    }

    validateAndConfirm() {
        //const{ socket } = this.context;
        console.log('username context');
        console.log(this.context);
        const { socket } = this.context;
        socket.emit('adduser', this.state.value, (loggedIn) => {

            if(loggedIn) {
                this.setState({confirm: true});
                this.props.onUser(this.state.confirm);
                this.props.giveUser(this.state.value);
                //this.joinLobby();
                socket.emit('joinroom', {room: 'lobby'}, (joinedLobby, reason) => {
                    if(joinedLobby) {
                        console.log('successfully joined room');
                    }else {
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
                <button type="button" onClick = {() => this.validateAndConfirm()} >submit username</button>
            </div>
        );
    }
}

User.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default User;
