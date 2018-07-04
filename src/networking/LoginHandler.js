import NetworkingHandler from "./NetworkHandler";

class LoginHandler extends NetworkingHandler {

    login(loginRequest) {
        loginRequest['roleToken'] = 'c';
        return this.executeRequest('auth', this.methods.post(), loginRequest, {});
    }

}

export default LoginHandler;