import React from 'react';
import { PropTypes} from 'prop-types';
import FaBeer from 'react-icons/lib/fa/close';

class ChatList extends React.Component {

    componentDidMount() {
        const{ socket } = this.context;
        socket.emit('rooms',  {

        });
        socket.on('roomlist', rooms => {

            let allRomms = Object.keys(rooms);

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

    handleClick(i) {
        const{ socket } = this.context;

        socket.emit('joinroom', {room: i, pass: undefined}, (loggedIn, theLog) => {
            if(loggedIn) {
                console.log('Room successfully joined');

            }else {
                console.log(theLog);
            }
        });

        this.setState({selectedRoom: i});
        this.props.room(i);

    }

    leaveRoom(i) {
        const{ socket } = this.context;
        socket.on('servermessage', (a ,b ,c)=> {
            console.log('User ', c , ' is leaving room: ', b);

        });

        socket.emit('partroom', i);
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
                    <div key={i}>
                        <li key={i} onClick={this.handleClick.bind(this, i)}>{result}
                            <FaBeer  onClick = {this.leaveRoom.bind(this, i)}/></li>
                    </div>
                ))}

            </div>
        );
    }
}

ChatList.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default ChatList;
