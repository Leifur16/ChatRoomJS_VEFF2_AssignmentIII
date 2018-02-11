import React from 'react';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            value : '',
            userNames: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
    }
	
    handleChange(e) {
        this.setState({value: e.target.value});
    }

    validate(e) {
        var exists = false;

        for(var i = 0; i < this.state.userNames.length; i++) {
			
            if(this.state.userNames[i] === this.state.value) {
                exists = true;
            }	
        }

        if(!exists) {
            console.log(exists);
            this.state.userNames.push(this.state.value);
        }
		
        console.log(this.state.userNames.length);
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.validate}>
                <label>
                    Name:
                    <input type="text" value = { this.state.value } onChange = { this.handleChange } />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );

    }
}

export default User;

