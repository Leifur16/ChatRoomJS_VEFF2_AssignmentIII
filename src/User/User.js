import React from 'react';


class User extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
          <div>Username<input type="text" name="uname"/></div>
        );
    }
	/*Array.prototype.inArray = function(comparer) {
    for(var i=0; i < this.length; i++) {
        if(comparer(this[i])) return true;
    }
    return false;
	};*/
}

export default User;
