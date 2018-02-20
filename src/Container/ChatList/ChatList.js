import React from 'react';
import { PropTypes} from 'prop-types';
import FaBeer from 'react-icons/lib/fa/close';

class ChatList extends React.Component {
    
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
        this.componentDidMount();

    }

    componentDidMount() {
        const{ socket } = this.context;
        socket.emit('rooms',  {

        });
        socket.on('roomlist', rooms => {

            let allRomms = Object.assign([], rooms);

            this.setState({listRooms: allRomms});
        });

    }

    leaveRoom(i) {
        const{ socket } = this.context;
        socket.on('servermessage', (a ,b ,c)=> {
            console.log('User ', c , ' is leaving room: ', b);

        });

        socket.emit('partroom', i);
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

    render() {


        return (
            <div className = "chatListMar">
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
                    <div key={i}>
                        <li
                            onClick={this.handleClick.bind(this, i)}>{result.topic}
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
