import NetworkingHandler from "./NetworkHandler";

class ProfileHandler extends NetworkingHandler {

    constructor(userId, sessionId) {
        super();
        const authHeader = { 'X-Auth-Token': sessionId };

        this.getProfile = () => this.executeRequest(`user/${userId}`, this.methods.get(), null, authHeader);

        this.updateProfile = (request) => this.executeRequest(`user/${userId}`, this.methods.put(), request, authHeader);
    }
}

export default ProfileHandler;