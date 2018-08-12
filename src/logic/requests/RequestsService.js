import RequestsHandler from '../../networking/RequestsHandler';

class RequestsService {

    constructor(sessionId, zoneName) {
        const handler = new RequestsHandler(sessionId);

        this.submitRequest = function (name, description) {
            return Promise
                .resolve(name)
                .then(name => validate(name))
                .then(name => createRequest(name, description))
                .then(request => handler.sumitRequest(request))
                .then(result => result !== null ? 'Request submitted successfully' : 'Request failed to submit');
        }

        const validate = function (name) {
            if (name === null) {
                throw new Error('The domain name is a required field');
            } else {
                return name;
            }
        }

        const createRequest = function (name, description) {
            return {
                domainName: name + zoneName,
                description: description
            }
        }
    }
}

export default RequestsService;