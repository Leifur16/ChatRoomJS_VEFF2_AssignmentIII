import React from 'react';
import { PropTypes } from 'prop-types';

class ChatWindow extends React.Component {
    componentDidMount() {

        const { socket } = this.context;
        socket.on('updatechat', (id, allMesseges) => {
            console.log(id);
            console.log(allMesseges);

            console.log(updatedMessages);
            let simpleMessages = [];
            for(var i = 0; i < updatedMessages.length; i++) {
                simpleMessages[i] = updatedMessages[i].nick + ' - ' + updatedMessages[i].timestamp + ' - ' + updatedMessages[i].message;
            }
            console.log('show this pleas');
            console.log(simpleMessages);
            this.setState({ messages: simpleMessages});
        });
    }
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            messages: [],
            roomName: 'lobby'
        };
    }
    sendMessage() {
        const { socket } = this.context;
        let messageObject = {
          msg: this.state.msg,
          roomName: this.state.roomName
        }
        socket.emit('sendmsg', messageObject);
        this.setState({ msg: '' });
    }
    render() {
        const { messages, msg } = this.state;
        return (
            <div className="chat-window">
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
