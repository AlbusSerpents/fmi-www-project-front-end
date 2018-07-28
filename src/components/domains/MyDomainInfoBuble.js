import React, { Component } from 'react';
import '../../styles/domains-info.css';

class MyDomainInfoBuble extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='my-domain-info-buble'>
                Domain: {this.props.data.name} <br />
                IP V6 Address: {this.props.data.address} <br />
                Description: {this.props.data.description}
            </div>
        );
    }

}

export default MyDomainInfoBuble;