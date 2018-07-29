import React, { Component } from 'react';
import '../../styles/domains-info.css';

class MyDomainInfoBuble extends Component {

    render() {
        return (
            <div className='my-domain-info-buble'>
                <u>Domain:</u> {this.props.data.name} <br />
                <u>IP V6 Address:</u> {this.props.data.address} <br />
                <u>Description:</u> {this.props.data.description}
            </div>
        );
    }

}

export default MyDomainInfoBuble;