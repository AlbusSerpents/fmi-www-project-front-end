import NetworkingHandler from "./NetworkHandler";

class DomainsHandler extends NetworkingHandler {
    getMyDomains(id, sessionId) {
        return this.executeRequest(
            `domain/my-domains/${id}`,
            this.methods.get(),
            null,
            { 'X-Auth-Token': sessionId }
        );
    }
}

export default DomainsHandler;