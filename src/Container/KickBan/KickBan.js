import React from 'react';
import { PropTypes } from 'prop-types';

class KickBan extends React.Component {

    render() {
        return(
            <div>
                kick or ban
            </div>
        )
    }
}

KickBan.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default KickBan;
