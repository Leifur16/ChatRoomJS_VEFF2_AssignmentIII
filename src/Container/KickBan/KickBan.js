import React from 'react';
import { PropTypes } from 'prop-types';

class KickBan extends React.Component {

    isOped() {
        console.log('why hello there');
        console.log('this is the room id: ',this.props.room)
        const { socket } = this.context;
        socket.emit('rooms',  {

        });
        socket.on('roomlist', rooms => {

            console.log('room!: ',this.props.room);
            let allKeys = Object.assign([], Object.keys(rooms));

            for(let i = 0; i < allKeys.length; i++) {
                console.log('inside loop');
                console.log(allKeys[i]);
                if(allKeys[i] == this.props.room) {
                    console.log('fékk rétt herbergi');
                    console.log('username', rooms[this.props.room].ops);
                    var username = Object.values(rooms[this.props.room].ops);
                    console.log(username);
                    console.log('username', this.props.user);
                    if(username == this.props.user) {
                        console.log('you are the admin!');
                    }
                }
            }
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            userName: ''
        }
        console.log('room!: ', this.props.room);
        //this.isOped();
    }


    kick() {
        let kickObj = {
            user : this.state.userName,
            room: this.props.room
        }

        const { socket } = this.context;
        socket.emit('kick', kickObj, (kicked, error) => {
            if(kicked) {
                console.log('successfully kicked player');
            }else {
                console.log(error);
            }
        });
        this.setState({ userName: '' });
    }
    ban() {
        let banObj = {
            user : this.state.userName,
            room: this.props.room
        }

        const { socket } = this.context;
        socket.emit('ban', banObj, (banned, error) => {
            if(banned) {
                console.log('successfully banned player');
            }else {
                console.log(error);
            }
        });
        this.setState({ userName: '' });
    }

    render() {
        const { userName } = this.state;
        return(
            <div>
                <button type="button" className="btn pull-right" onClick={() => this.isOped()}>Send</button>

                <input
                    type="text"
                    value={userName}
                    className=""
                    onInput={(e) => this.setState({ userName: e.target.value })} />
                <button type="button" className="btn pull-right" onClick={() => this.kick()}>kick</button>
                <button type="button" className="btn pull-right" onClick={() => this.ban()}>ban</button>
            </div>
        )
    }
}

KickBan.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default KickBan;
