import NetworkingHandler from "./NetworkHandler";

class RequestsHandler extends NetworkingHandler {

    constructor(sessionId) {
        super();
        const authHeader = { 'X-Auth-Token': sessionId };

        this.sumitRequest = function (domainRequest) {
            return this.executeRequest(`request`, this.methods.post(), domainRequest, authHeader);
        }

        this.getAll = function(){
            return this.executeRequest(`request`, this.methods.get(), null, authHeader);
        }

        this.approve = function(requestId){
            return this.executeRequest(`request/${requestId}/approve`, this.methods.post(), null, authHeader);
        }

        this.reject = function(requestId){
            return this.executeRequest(`request/${requestId}/reject`, this.methods.post(), null, authHeader);
        }

    }
}

export default RequestsHandler;