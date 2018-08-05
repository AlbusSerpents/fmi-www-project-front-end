import NetworkingHandler from "./NetworkHandler";

class ProfileHandler extends NetworkingHandler {

    constructor(userId, sessionId) {
        super();
        const authHeader = { 'X-Auth-Token': sessionId };

        this.getProfile = (role) => this.executeRequest(`user/${userId}?userRole=${role}`, this.methods.get(), null, authHeader);

        this.updateProfile = function (request) {
            return this.executeRequest(`user/${userId}`, this.methods.put(), request, authHeader);
        }
    }
}

export default ProfileHandler;