import NetworkingHandler from './NetworkHandler';

class SessionHandler extends NetworkingHandler {

    register(regiserRequest) {
        return this.executeRequest('client', this.methods.post(), regiserRequest, {});
    }

    login(loginRequest) {
        return this.executeRequest('auth', this.methods.post(), loginRequest, {});
    }

    logout(sessionId) {
        const authHeader = { 'X-Auth-Token': sessionId };
        return this.executeRequest('auth', this.methods.delete(), {}, authHeader);
    }
}

export default SessionHandler;