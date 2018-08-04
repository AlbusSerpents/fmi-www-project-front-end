import DomainsHandler from '../../networking/DomainsHandler'

class DomainSearchService {

    constructor(sessionId) {
        this.search = new DomainSearch(sessionId);
        this.searchDomains = this.searchDomains.bind(this);
    }

    searchDomains(params) {
        if (this.search.validate(params)) {
            const query = this.search.createQuery(params);
            return this.search.executeRequest(query)
        } else {
            return null;
        }
    }

}

class DomainSearch {
    constructor(sessionId) {
        this.handler = new DomainsHandler(sessionId);

        this.validate = this.validate.bind(this);
        this.createQuery = this.createQuery.bind(this);
        this.executeRequest = this.executeRequest.bind(this);
    }

    validate(params) {
        const text = params.text;
        const type = params.type

        if (text === null || text === '') {
            alert('Can not search for empty value');
            return false;
        } else if (type === null) {
            alert('Choose a type of the input field')
            return false;
        } else if (type !== 'IP' && type !== 'Domain') {
            alert('Internal Error');
            return false;
        } else {
            return true;
        }
    }

    createQuery(params) {
        const text = params.text;
        const type = params.type

        switch (type) {
            case 'IP':
                return { ip: text, domain: null };
            case 'Domain':
                return { ip: null, domain: text };
            default:
                return null;
        }
    }

    executeRequest(query) {
        return this.handler
            .searchDomain(query.ip, query.domain)
            .then(found => ({
                result: found,
                hasResults: found != null
            }));
    }

}

export default DomainSearchService;