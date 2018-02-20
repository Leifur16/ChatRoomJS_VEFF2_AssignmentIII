import React from 'react';
import { PropTypes } from 'prop-types';

class ChatWindow extends React.Component {
    componentDidMount() {

        const { socket } = this.context;

        socket.on('updatechat', (id, allMesseges) => {
            let messages = [];
            for(var i = 0; i < allMesseges.length; i++) {
                messages.push(allMesseges[i].nick + ' - ' + allMesseges[i].timestamp + ' - ' + allMesseges[i].message);
            };
            this.setState({ messages });
        });
    }
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            messages: [],
            roomName: this.props.room
        };
    }
    sendMessage() {
        const { socket } = this.context;
        let messageObject = {
            msg: this.state.msg,
            roomName: this.props.room
        }
        socket.emit('sendmsg', messageObject);
        this.setState({ msg: '' });
    }
    render() {
        const { messages, msg } = this.state;

        return (
            <div className="chat-window">

                <h3>{this.props.room}</h3>
                {messages.map(m => ( <div key={m}>{m}</div> ))}
                <div className="input-box">
                    <input
                        type="text"
                        value={msg}
                        className="input input-big"
                        onInput={(e) => this.setState({ msg: e.target.value })} />
                    <button type="button" className="btn pull-right" onClick={() => this.sendMessage()}>Send</button>
                </div>
            </div>
        );
    }
};

ChatWindow.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default ChatWindow;
