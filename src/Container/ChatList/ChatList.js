import React from 'react';
import { PropTypes} from 'prop-types';

class ChatList extends React.Component {
    componentDidMount() {
        const{ socket } = this.context;
        console.log('listRooms');
        socket.on('roomlist', (room) =>{
            let rooms = Object.assign([], this.state.listRooms);
            rooms.push(room);
            this.setState({rooms});
        })
    }
    constructor(props) {
        super(props);
        this.state = {
            room: '',
            pass: '',
            listRooms: [],
        };
    }

    CreateChat() {
        const{ socket } = this.context;
        console.log('hahdh');
        socket.emit('joinroom', {room: this.state.room, pass: this.state.pass }, (loggedIn) => {
            console.log(loggedIn);
        });
    }

    render() {
        const{ listRooms } = this.state.listRooms;
        var rooms = this.state.listRooms.length ? listRooms.map(m => (<div> {m} </div>)) : '';


        return (
            <div>
                <input type = "text"  onInput = {(e) => this.setState({room: e.target.value})} />
                <input type = "password" onInput = {(e) => this.setState({pass: e.target.value})} />
                <button type="button" onClick = {() => this.CreateChat()} >Confirm</button>
                <div>
                    {rooms}
                </div>
            </div>
        );
    }
}

ChatList.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default ChatList;
