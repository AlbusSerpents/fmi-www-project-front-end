import RequestsHandler from '../../networking/RequestsHandler';

class RequestsService {

    constructor(sessionId, zoneName) {
        const handler = new RequestsHandler(sessionId);

        this.submitRequest = function (name, description) {
            if (name === null) {
                return Promise.resolve('The domain name is a required field');
            }else{
                const domainRequest = {
                    domainName: name + zoneName,
                    description: description
                }
    
                return handler.sumitRequest(domainRequest)
                    .then(result => result !== null)
                    .then(success => success ? 'Request submitted successfully' : 'Request failed to submit');
            }
        }

    }
}

export default RequestsService;