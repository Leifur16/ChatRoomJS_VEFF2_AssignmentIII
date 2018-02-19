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
        console.log('in displayList');
        socket.emit('rooms',  {

        });
        socket.on('roomlist', rooms => {
            let allRomms = Object.assign([], rooms);

            this.setState({listRooms: allRomms});
        });

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
                    <li key={i}>{result.topic}</li>
                ))}


            </div>
        );
    }
}

ChatList.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default ChatList;
