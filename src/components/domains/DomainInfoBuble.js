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
                Domain: {this.props.data.result.name} <br />
                IP V6 Address: {this.props.data.result.address}
            </div>
        );
    }

    drawNoResults() {
        return (<div className='domain-info-buble'>No Results found.</div>);
    }

    render() {
        return (
            this.props.data.hasResults ? this.drawResult() : this.drawNoResults()
        )
    }

}

export default DomainInfoBuble;