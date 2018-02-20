import React from 'react';
import { PropTypes } from 'prop-types';

class KickBan extends React.Component {

    render() {
        return(
            <div>
                <h3>kick or ban</h3>
            </div>
        )
    }
}

KickBan.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default KickBan;
