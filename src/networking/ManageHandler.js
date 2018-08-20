import NetworkingHandler from "./NetworkHandler";

class ManageHandler extends NetworkingHandler {

    constructor(sessionId) {
        super();
        const authHeader = { 'X-Auth-Token': sessionId };

        this.getClients = () => this.executeRequest(`manage`, this.methods.get(), null, authHeader);

        this.deleteProfile = (clientId)  =>  this.executeRequest(`manage/${clientId}`, this.methods.delete(), null, authHeader);
    }
}

export default ManageHandler;