import React, { Component } from 'react';
import '../../styles/domains.css';

import MyDomainInfoBuble from './MyDomainInfoBuble'

import DomainsHandler from '../../networking/DomainsHandler'
import MyDomainsService from '../../logic/MyDomainsService';

class MyDomains extends Component {

    constructor(props) {
        super(props);
        this.service = new MyDomainsService(this.props.sessionId, this.props.userId);

        this.drawMyDomains = this.drawMyDomains.bind(this);

        this.handler = new DomainsHandler(this.props.sessionId);

        this.state = {
            myDomains: null
        };
    }

    componentWillMount() {
        this.service
            .getMyDomains()
            .then(myDomains => this.setState({ myDomains: myDomains }));
        console.log('On load');
        console.log(this.state.myDomains);
    }

    drawMyDomains() {
        console.log('Drawing');
        console.log(this.state.myDomains);
        console.log('AAA');
        if (this.state.myDomains != null) {
            console.log(this.state.myDomains);
            var temp = this.state.myDomains.map((record) => < MyDomainInfoBuble key={record.id} data={record.domain} />)
            console.log('Pesho');
            console.log(temp);
            return temp;
        }
    }

    render() {
        return (
            <div className='my-domains'>
                Currently owned domains
                {this.drawMyDomains()}
            </div >
        );
    }

}

export default MyDomains;