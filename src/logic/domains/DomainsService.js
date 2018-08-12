import DomainsHandler from '../../networking/DomainsHandler'

class DomainsService {

    constructor(sessionId) {
        const handler = new DomainsHandler(sessionId);

        this.searchDomains = function (search) {
            return Promise
                .resolve(search)
                .then(search => validate(search))
                .then(params => createQuery(params))
                .then(query => handler.searchDomain(query.ip, query.domain));
        }

        const validate = function (params) {
            if (params.text === null || params.text === '') {
                throw new Error('Can not search for empty value');
            } else if (params.type === null) {
                throw new Error('Choose a type of the input field')
            } else if (params.type !== 'IP' && params.type !== 'Domain') {
                throw new Error('Internal Error');
            } else {
                return params;
            }
        }

        const createQuery = function (params) {
            switch (params.type) {
                case 'IP':
                    return { ip: params.text, domain: null };
                case 'Domain':
                    return { ip: null, domain: params.text };
                default:
                    throw new Error('Internal Error');
            }
        }

        this.getMyDomains = function (userId) {
            return handler
                .getMyDomains(userId)
                .then(result => result === null ? [] : result)
                .then(myDomains => transformMyDomains(myDomains));
        }

        const transformMyDomains = function (domains) {
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

}

export default DomainsService;