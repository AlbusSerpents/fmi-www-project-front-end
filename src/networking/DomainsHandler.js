import NetworkingHandler from "./NetworkHandler";

class DomainsHandler extends NetworkingHandler {

    constructor(sessionId) {
        super();
        const authHeader = { 'X-Auth-Token': sessionId };

        this.getMyDomains = function (id) {
            return this.executeRequest(
                `domain/my-domains/${id}`,
                this.methods.get(),
                null,
                authHeader
            );
        }

        this.searchDomain = function (address, domain) {
            let url = `domain?`;
            if (address !== null) {
                url += `address=${address}`;
            }
            if (domain !== null) {
                url += `name=${domain}`;
            }

            return this.executeRequest(url, this.methods.get(), null, authHeader);
        }
    }
}

export default DomainsHandler;