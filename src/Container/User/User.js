import React from 'react';
import { PropTypes } from 'prop-types';


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
            }else{
                this.setState({confirm: false});
                this.props.onUser(this.state.confirm);
            }
        });

        //this.setState({value: ''});
    }


    render() {
        const {value} = this.state;
        return (

            <div className = "wrapper">
                <div className="form-signin">
                    <h2 className="form-signin-heading">Please login</h2>
                    <input type="text" className = "form-control" name = "username" placeholder = "Username" value = { value} onInput={(e) => this.setState({value: e.target.value})} />
                    <button className ="btn" type="submit" onClick = {() => this.validateAndConfirm()}>Login</button>
                </div>
            </div>
        );
    }
}

User.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default User;
