import DomainsHandler from '../networking/DomainsHandler'

class MyDomainsService {

    constructor(sessionId, userId) {
        this.dataSource = new MyDomainsDataSource(sessionId, userId);
        this.getMyDomains = this.getMyDomains.bind(this);

    }

    getMyDomains() {
        return this.dataSource.fetchMyDomains();
    }

}

class MyDomainsDataSource {
    constructor(sessionId, userId) {
        this.handler = new DomainsHandler(sessionId);
        this.userId = userId;

        this.fetchMyDomains = this.fetchMyDomains.bind(this);
        this.transformResults = this.transformResults.bind(this);
    }

    fetchMyDomains() {
        return this.handler
            .getMyDomains(this.userId)
            .then(result => result === null ? [] : result)
            .then(myDomains => this.transformResults(myDomains));
    }

    transformResults(domains) {
        console.log('fetch');
        console.log(domains);
        return domains.map(domain => ({
            id: domain.id,
            domain: {
                name: domain.domainDetails.domainName,
                description: domain.domainDetails.description,
                address: domain.address.address
            }
        }));
    }

}

export default MyDomainsService;