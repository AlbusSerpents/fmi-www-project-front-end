class NetworkingHandler {

    // var status = fetch('https://localhost:8080/status', {
    //     method: 'GET',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         firstParam: 'yourValue',
    //         secondParam: 'yourOtherValue',
    //     })
    // });


    constructor() {
        this.methods = new HttpMethods();
        const handleError = function (exception) {
            alert(exception.error);
            return null;
        }

        this.executeRequest = function (relativeUrl, method, body, headers) {
            body = JSON.stringify(body);
            headers['Content-Type'] = 'application/json';
            return fetch(`http://localhost:8080/${relativeUrl}`, { method, headers, body })
                .then(response => response.status < 400 ? response.json() : handleError(response));
        }
    }

    login(loginRequest) {
        return this.executeRequest('auth', this.methods.post(), loginRequest, {});
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