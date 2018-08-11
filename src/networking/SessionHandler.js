import NetworkingHandler from "./NetworkHandler";

class SessionHandler extends NetworkingHandler {

    login(loginRequest) {
        loginRequest['roleToken'] = 'c';
        return this.executeRequest('auth', this.methods.post(), loginRequest, {});
    }

    logout(sessionId) {
        const authHeader = { 'X-Auth-Token': sessionId };
        return this.executeRequest('auth', this.methods.delete(), {}, authHeader);
    }

}

export default SessionHandler;