import React, { Component } from 'react';
import '../styles/domains-search.css';

class DomainSearch extends Component {

    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.state = {
            search: null,
            type: null
        }
    }

    handleSearch() {
        const search = this.state.search;
        const type = this.state.type;
        if (search === null || search === '') {
            alert('Can not search for empty value');
            return;
        }
        if (type == null) {
            alert('Choose a type of the input field')
            return;
        }
        if (type === 'IP') {
            this.props.searchIp(search);
        } else if(type == 'Domain'){
            this.props.searchDomain(search);
        }
    }

    render() {
        return (
            <div className={this.props.className}>
                <input type='text' className='search-bar-text' onChange={(e) => this.setState({ search: e.target.value })} />
                <div className='search-type'>
                    <div className='search-bar-radio'>
                        <input type='radio' name='type' value='Ip Addres' onClick={(e) => this.setState({ type: 'IP' })} />IP Address
                            </div>
                    <div className='search-bar-radio' >
                        <input type='radio' name='type' value='Domain' onClick={(e) => this.setState({ type: 'Domain' })} />Domain
                            </div>
                </div>
                <input type='button' value='Search' className='search-button' onClick={(e) => this.handleSearch()} />
            </div>
        );
    }

}

export default DomainSearch;