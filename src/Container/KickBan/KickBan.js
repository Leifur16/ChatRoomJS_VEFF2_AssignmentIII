import React from 'react';
import { PropTypes } from 'prop-types';

class KickBan extends React.Component {

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

                <input
                    type="text"
                    value={userName}
                    className=""
                    className = "inputKick"
                    onInput={(e) => this.setState({ userName: e.target.value })} />
                <br/>
                <button type="button" className="btnKick" onClick={() => this.kick()}>kick</button>
                <button type="button" className="btnKick" onClick={() => this.ban()}>ban </button>
            </div>
        )
    }
}

KickBan.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default KickBan;
