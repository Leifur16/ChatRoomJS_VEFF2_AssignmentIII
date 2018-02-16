import React from 'react';
import { PropTypes} from 'prop-types';

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            value : '',
            userNames: [],
            confirm: false,
        };
    }

    validateAndConfirm() {
        console.log("hello");
        const{ socket } = this.context;
        socket.emit('adduser', this.state.value, (loggedIn) => {

            if(!loggedIn){
                this.setState({confirm = true});
                this.props.getResult = this.state.confirm;

                console.log(this.props.getResult);

            }
        });


        this.setState({value: ''});
    }
    onChangeValue() {
        this.props.changeLink(this.state.confirm);
    }

    render() {
        const {value} = this.state;
        return (
            <div>
                <chatserver user = {this.state.value} />
                <input type="text" value = { value} onInput={(e) => this.setState({value: e.target.value})} />
                <button type="button" onClick = {() => this.validateAndConfirm()} >Confirm</button>
                <button type="button" onClick = {this.props.getResult}>whatever</button>
            </div>
        );

    }
}

User.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default User;
