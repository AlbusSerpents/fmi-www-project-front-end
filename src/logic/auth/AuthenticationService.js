import SessionHandler from '../../networking/SessionHandler';

class AuthenticationService {
    constructor() {
        const handler = new SessionHandler();

        const isEmpty = function (field) {
            return field === null || field === '';
        }

        this.login = function (username, password, roleToken) {
            return Promise
                .resolve({ username, password, roleToken })
                .then(request => validateLogin(request))
                .then(request => handler.login(request));
        }

        const validateLogin = function (request) {
            if (isEmpty(request.username)) {
                throw new Error('Username is required');
            } else if (isEmpty(request.password)) {
                throw new Error('Password is required');
            } else if (request.roleToken !== 'a' && request.roleToken !== 'c') {
                throw new Error('Invalid request');
            } else {
                return request;
            }
        }

        this.logout = function (sessionId) {
            return handler.logout(sessionId);
        }

        this.register = function (request) {
            return Promise
                .resolve(request)
                .then(request => validateRegistration(request))
                .then(request => handler.register(request));
        }

        const validateRegistration = function (request) {
            if (isEmpty(request.username)) {
                throw new Error('Username is required');
            } else if (isEmpty(request.password)) {
                throw new Error('Password is required');
            } else if (isEmpty(request.name)) {
                throw new Error('Name is required');
            } else if (isEmpty(request.email)) {
                throw new Error('Email is reuired');
            } else if (isEmpty(request.facultyNumber)) {
                throw new Error('Faculty number is required');
            } else if (request.facultyNumber < 10000 || request.facultyNumber > 99999) {
                throw new Error('Invalid faculty number. The number should be between 10000 and 99999');
            } else {
                return request;
            }
        }
    }
}

export default AuthenticationService;
