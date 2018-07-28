import React, { Component } from 'react';
import '../styles/domains-search.css';

class DomainSearch extends Component {

    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);

        this.handleClear = this.handleClear.bind(this);
        this.searchRef = React.createRef();
        this.typeRef = React.createRef();

        this.state = {
            search: null,
            type: null
        }
    }

    handleClear() {
        const cleanState = {
            search: null,
            type: null
        };
        this.setState(cleanState);
        this.searchRef.value = null;
        this.typeRef.checked = false;
        this.props.clearFunction();
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
        } else if (type === 'Domain') {
            this.props.searchDomain(search);
        }
    }

    render() {
        return (
            <div className={this.props.className}>
                <input type='text' className='search-bar-text' onChange={(e) => this.setState({ search: e.target.value })} ref={el => this.searchRef = el} />
                <div className='search-type'>
                    <div className='search-bar-radio'>
                        <input type='radio' name='type' value='Ip Addres' onClick={(e) => this.setState({ type: 'IP' })} ref={el => this.typeRef = el} />IP Address
                            </div>
                    <div className='search-bar-radio' >
                        <input type='radio' name='type' value='Domain' onClick={(e) => this.setState({ type: 'Domain' })} ref={el => this.typeRef = el} />Domain
                            </div>
                </div>
                <div className='search-buttons'>
                    <input type='button' value='Search' className='button' onClick={(e) => this.handleSearch()} />
                    <input type='button' value='Clear' className='button' onClick={(e) => this.handleClear()} />
                </div>
            </div>
        );
    }

}

export default DomainSearch;