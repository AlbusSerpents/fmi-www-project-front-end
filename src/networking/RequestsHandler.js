import NetworkingHandler from "./NetworkHandler";

class RequestsHandler extends NetworkingHandler {

    constructor(sessionId) {
        super();
        const authHeader = { 'X-Auth-Token': sessionId };

        this.sumitRequest = function (domainRequest) {
            return this.executeRequest(`/request`, this.methods.post(), domainRequest, authHeader);
        }
    }
}

export default RequestsHandler;