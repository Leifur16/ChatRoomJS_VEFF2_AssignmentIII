import React from 'react';
import { PropTypes} from 'prop-types';

class ChatList extends React.Component {
    /*componentDidMount() {
        const{ socket } = this.context;
        console.log('listRooms');
        socket.on('roomlist', (room) =>{
            let rooms = Object.assign([], this.state.listRooms);
            rooms.push(room);
            this.setState({rooms});
        })
    }*/
    constructor(props) {
        super(props);
        this.state = {
            topic: '',
            listRooms: [],
            userName: '',
            selectedRoom :  0,
            room: 0,
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
        this.componentDidMount();

    }

    componentDidMount() {
        const{ socket } = this.context;
        console.log('in displayList');
        socket.emit('rooms',  {

        });
        socket.on('roomlist', rooms => {

            let allRomms = Object.assign([], rooms);

            this.setState({listRooms: allRomms});
        });

    }
    leaveRoom(i, event) {
        const{ socket } = this.context;
        console.log(i);
        console.log(event);
        socket.emit('partroom', i);

        socket.on('servermessage', 'part', console.log(fn), console.log(fn2));
    }

    handleClick(i, event) {
        const{ socket } = this.context;

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


        return (
            <div>
                <div className = "form-group">
                    <label htmlFor = "room">Room </label>
                    <input type = "number" id = "room"  onInput = {(e) => this.setState({room: e.target.value})} />
                </div>
                <div className = "form-group">
                    <label htmlFor = "topic">Topic </label>
                    <input type = "text"  id = "topic" onInput = {(e) => this.setState({topic: e.target.value})} />
                </div>
                <button type="button" onClick = {() => this.CreateChat()} >Confirm</button>

                {this.state.listRooms.map((result, i) => (
                    <li key={i} onClick={this.handleClick.bind(this, i)}>{result.topic}</li>
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
