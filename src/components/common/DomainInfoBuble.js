import React, { Component } from 'react';
import '../../styles/domains-info.css';

class DomainInfoBuble extends Component {

    constructor(props) {
        super(props);

        this.draw = this.drawResult.bind(this);
        this.drawNothing = this.drawNoResults.bind(this);
    }

    drawResult() {
        return (
            <div className='domain-info-buble'>
                <u>Domain:</u> {this.props.data.name} <br />
                <u>IP V6 Address:</u> {this.props.data.address}
            </div>
        );
    }

    drawNoResults() {
        return (<div className='domain-info-buble'>No Results found.</div>);
    }

    render() {
        return (
            this.props.data !== null ? this.drawResult() : this.drawNoResults()
        )
    }

}

export default DomainInfoBuble;