class NetworkingHandler {

    constructor() {
        this.methods = new HttpMethods();
        const handleError = function (exception) {
            alert(exception.error);
            return null;
        }

        this.executeRequest = function (relativeUrl, method, body, headers, callback) {
            body = JSON.stringify(body);
            headers['Content-Type'] = 'application/json';
            return fetch(`http://localhost:8080/${relativeUrl}`, { method, headers, body })
                .then(response => response.status < 400 ? response.json() : handleError(response))
                .then(response => response == null ? {} : callback(response));
        }
    }

    login(loginRequest, responseProcessor) {
        return this.executeRequest('auth', this.methods.post(), loginRequest, {}, responseProcessor);
    }
}

class HttpMethods {
    constructor() {
        this.post = function () { return "POST" };
        this.get = function () { return "GET" };
        this.put = function () { return "PUT" };
        this.delete = function () { return "DELETE" };

    }
}

export default NetworkingHandler;