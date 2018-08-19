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

        this.getPending = function () {
            return handler
                .getAll()
                .then(requests => requests.map(present));
        }

        const present = function (request) {
            const id = request.id;
            const client = request.clientName;
            const facultyNumber = request.facultyNumber;
            const domain = request.details.domainName;
            const description = request.details.description;
            return { id, client, facultyNumber, domain, description };
        }

        this.approve = function (requestId) {
            return handler.approve(requestId).then(a => 'Domain created');
        }

        this.reject = function (requestId) {
            return handler.reject(requestId).then(a => 'Request rejected');
        }

    }
}

export default RequestsService;