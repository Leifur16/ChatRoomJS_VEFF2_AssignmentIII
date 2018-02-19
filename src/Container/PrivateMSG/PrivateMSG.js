import React from 'react';
import { PropTypes } from 'prop-types';

class PrivateMSG extends React.Component {

    componentDidMount() {

        const { socket } = this.context;
        socket.on('recv_privatemsg', (userName, msg) => {
            console.log(userName, ' ', msg);
            let allMesseges = this.state.messages;
            allMesseges.push(userName + ' - ' + msg);
            this.setState({ messages:allMesseges });
        });
    }
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            messages: [],
            user: ''
        };
    }
    sendMessage() {
        const { socket } = this.context;
        let msgObj = {
            nick: this.state.user,
            message: this.state.msg
        }
        this.setState({ msg: '' });
        socket.emit('privatemsg', msgObj, (sendMessage, error) => {
            if(sendMessage) {
                console.log('successfully sent message');
            }else {
                console.log(error);
            }
        });
    }

    render() {
        const { messages, msg, user } = this.state;
        return (
            <div className="private-chat-window">
                {messages.map(m => ( <div key={m}>{m}</div> ))}
                <div className="private-input-box">
                    user
                    <input
                        type="text"
                        value={user}
                        className="private-input"
                        onInput={(f) => this.setState({ user: f.target.value })}/>
                    <br />
                    message
                    <input
                        type="text"
                        value={msg}
                        className="private-input"
                        onInput={(e) => this.setState({ msg: e.target.value })} />
                    <br />
                    <button type="button" className="private-button" onClick={() => this.sendMessage()}>Send</button>
                </div>
            </div>
        );
    }
}

PrivateMSG.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default PrivateMSG;
