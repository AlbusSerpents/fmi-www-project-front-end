import React, { Component } from 'react';
import '../../styles/domains-search.css';

import DomainInfoBuble from './DomainInfoBuble'
import DomainSearchService from '../../logic/domains/DomainSearchService'

const initialState = {
    text: null,
    type: null,
    searchResult: null,
    hasResult : false
};

class DomainSearch extends Component {

    constructor(props) {
        super(props);
        this.service = new DomainSearchService(this.props.sessionId);

        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.drawResult = this.drawResult.bind(this);

        this.searchRef = React.createRef();
        this.domainRef = React.createRef();
        this.ipRef = React.createRef();

        this.state = initialState;
    }

    handleClear() {
        this.setState(initialState);

        this.searchRef.value = null;
        this.domainRef.checked = false;
        this.ipRef.checked = false;
    }

    handleSearch() {
        this.service
            .searchDomains({ text: this.state.text, type: this.state.type })
            .then(found => this.setState({ searchResult: found, hasResult: true }))
            .catch(error => alert(error.message));
    }

    drawResult() {
        if (this.state.hasResult)
            return <DomainInfoBuble data={this.state.searchResult} />
    }


    render() {
        return (
            <div className='domains-search'>
                <div className='domains-search-bar'>
                    <input type='text' className='search-bar-text' onChange={(e) => this.setState({ text: e.target.value })} ref={el => this.searchRef = el} />
                    <div className='search-type'>
                        <div className='search-bar-radio'>
                            <input type='radio' name='type' value='Ip Addres' onClick={(e) => this.setState({ type: 'IP' })} ref={el => this.domainRef = el} />IP Address
                            </div>
                        <div className='search-bar-radio' >
                            <input type='radio' name='type' value='Domain' onClick={(e) => this.setState({ type: 'Domain' })} ref={el => this.ipRef = el} />Domain
                            </div>
                    </div>
                    <div className='search-buttons'>
                        <input type='button' value='Search' className='button' onClick={(e) => this.handleSearch()} />
                        <input type='button' value='Clear' className='button' onClick={(e) => this.handleClear()} />
                    </div>
                </div>
                <div className='domains-search-result'>
                    {this.drawResult()}
                </div>
            </div>
        );
    }

}

export default DomainSearch;