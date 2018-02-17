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
            room: undefined,
            listRooms: [],
            userName: '',
        };
    }

    getUsername(us) {
        this.setState({userName: us});
    }

    CreateChat() {
        const{ socket } = this.context;
        console.log('room: ' + this.state.room);


        socket.emit('adduser', this.props.user , (loggedIn) => {
            if(loggedIn) {
                console.log('loggedin');
                socket.emit('joinroom', {room: this.state.room}, (loggedIn, TREW) => {
                    if(loggedIn) {
                        console.log('Thu ert hora');

                    }else {
                        console.log(TREW);
                    }
                });
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
            console.log('allRomms: ' + allRomms);

            this.setState({listRooms: allRomms});
            console.log('listRooms: ' + this.state.listRooms);
        });

    }

    render() {
        const {rooms = []} = this.state.listRooms;
        const list = rooms.map((number) =>
            <li>{number}</li>
        );

        return (
            <div>
                <input type = "number"  onInput = {(e) => this.setState({room: e.target.value})} />
                <input type = "password"  onInput = {(e) => this.setState({pass: e.target.value})} />
                <button type="button" onClick = {() => this.CreateChat()} >Confirm</button>
                <ul>{list}</ul>


            </div>
        );
    }
}

ChatList.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default ChatList;
