import React, { Component } from 'react';
import '../../styles/my-domains.css';

import MyDomainInfoBuble from './MyDomainInfoBuble'
import DomainsService from '../../logic/domains/DomainsService';

class MyDomains extends Component {

    constructor(props) {
        super(props);
        this.service = new DomainsService(this.props.sessionId);
        this.drawMyDomains = this.drawMyDomains.bind(this);

        this.state = {
            myDomains: null
        };
    }

    componentWillMount() {
        this.service.getMyDomains(this.props.userId)
            .then(myDomains => this.setState({ myDomains: myDomains }))
            .catch(error => alert(error.message));
    }

    drawMyDomains() {
        if (this.state.myDomains === null) {
            return;
        }
        var myDomainsElements = this.state.myDomains;

        var createACell = function (index, elements) {
            return <td className='my-domains-element'> {elements[index] != null ?
                < MyDomainInfoBuble data={elements[index].domain} key={elements[index].id} />
                : null}
            </td>;
        }

        var rows = [];
        for (var i = 0; i < myDomainsElements.length / 3; i++) {
            rows.push(
                <tr key={i}>
                    {createACell(3 * i + 1, myDomainsElements)}
                    {createACell(3 * i + 0, myDomainsElements)}
                    {createACell(3 * i + 2, myDomainsElements)}
                </tr>
            );
        }

        return rows;
    }

    render() {
        return (
            <div>
                <div className='my-domains-title'>
                    Currently owned domains
                </div>
                <table className='my-domains-results-table'>
                    <tbody className='my-domains-table-body'>
                        {this.drawMyDomains()}
                    </tbody>
                </table>

            </div>
        );
    }

}

export default MyDomains;