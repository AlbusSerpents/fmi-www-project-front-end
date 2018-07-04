import React, { Component } from 'react';

class DomainInfoBuble extends Component {

    constructor(props) {
        super(props);

        this.draw = this.drawResult.bind(this);
        this.drawNothing = this.drawNothing.bind(this);
    }

    drawResult() {
        return (
            <div className={this.props.className}>
                Domain: {this.props.result.name} <br />
                IP V6 Address: {this.props.result.address}
            </div>
        );
    }

    drawNothing() {
        return (
            <div className={this.props.className}>
                No Results found.
            </div>
        );
    }

    render() {
        return (
            this.props.hasResults ? this.drawResult() : this.drawNothing()
        )
    }

}

export default DomainInfoBuble;