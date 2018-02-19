import React from 'react';
import { PropTypes} from 'prop-types';

class ChatList extends React.Component {

    componentDidMount() {
        const{ socket } = this.context;
        console.log('in displayList');
        socket.emit('rooms',  {

        });
        socket.on('roomlist', rooms => {

            let allRomms = Object.keys(rooms);
            console.log('allRomms');

            this.setState({listRooms: allRomms});
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            topic: '',
            listRooms: [],
            userName: '',
            selectedRoom :  '',
            room: '',
            isOped: false,
        };
    }

    getUsername(us) {
        this.setState({userName: us});
    }

    CreateChat() {
        const{ socket } = this.context;

        var roomAndNone = {
            room: this.state.room,
            pass: undefined
        };

        socket.emit('joinroom', roomAndNone, (loggedIn, theLog) => {
            if(loggedIn) {
                console.log('Room successfully created');
                socket.emit('rooms',  {

                });

            }else {
                console.log(theLog);
            }
        });
        socket.emit('settopic', {room: this.state.room, topic: this.state.topic}, (created, theLog) => {
            if(created) {
                console.log('topic created');
            }else {
                console.log(theLog);
            }
        });
        console.log(this.state.selectedRoom);

        /*socket.emit('rooms',  {

        });*/


    }


    leaveRoom(i, event) {
        const{ socket } = this.context;
        console.log(i);
        console.log(event);
        socket.emit('partroom', i, (log, log2) =>{
            console.log(log);
            console.log(log2);
        });
    }

    handleClick(i, event) {
        const{ socket } = this.context;
        console.log(i, event);
        socket.emit('joinroom', {room: i, pass: undefined}, (loggedIn, theLog) => {
            if(loggedIn) {
                console.log('Room successfully joined');

            }else {
                console.log(theLog);
            }
        });

        console.log(i);
        this.setState({selectedRoom: i});
        this.props.room(i);
        console.log('event: ' + event);

    }

    render() {

        const { listRooms, room, topic } = this.state;
        return (
            <div>
                <div className = "form-group">
                    <label htmlFor = "room">Room </label>
                    <input
                        type = "text"
                        value = {room}
                        id = "room"
                        onInput = {(e) => this.setState({room: e.target.value})} />
                </div>
                <div className = "form-group">
                    <label htmlFor = "topic">Topic </label>
                    <input
                        type = "text"
                        value = {topic}
                        id = "topic"
                        onInput = {(e) => this.setState({topic: e.target.value})} />
                </div>
                <button type="button" onClick = {() => this.CreateChat()} >Confirm</button>

                {listRooms.map((result, i) => (
                    <li key={i} onClick={this.handleClick.bind(this, i)}>{result}</li>
                ))}
                {this.state.listRooms.map((result, i) => (
                    <button key = {i+1} onClick = {this.leaveRoom.bind(this, i)}>x</button>
                ))}
            </div>
        );
    }
}

ChatList.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default ChatList;
