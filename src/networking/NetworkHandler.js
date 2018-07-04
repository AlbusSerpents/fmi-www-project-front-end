class NetworkingHandler {

    constructor() {
        this.methods = new HttpMethods();
        const handleError = function (exception) {
            if (exception.error) {
                alert(exception.error);
            } else {
                alert('Unknown exception');
            }
            return null;
        }

        const get = function (relativeUrl, method, headers) {
            return fetch(`http://localhost:8080/${relativeUrl}`, { method, headers });
        }

        const otherMethods = function (relativeUrl, method, body, headers) {
            return fetch(`http://localhost:8080/${relativeUrl}`, { method, headers, body });
        }

        this.executeRequest = function (relativeUrl, method, body, headers) {
            body = JSON.stringify(body);
            headers['Content-Type'] = 'application/json';
            return (method === this.methods.get() ? get(relativeUrl, method, headers) : otherMethods(relativeUrl, method, body, headers))
                .then((response) => {
                    return { status: response.status, body: response.text().then(text => text ? JSON.parse(text) : null) };
                }).then(({ status, body }) => {
                    return status < 400 ? body : body.then(handleError)
                }).catch(exception => {
                    console.log(exception);
                    alert('Unknown server exception');
                    return null;
                });
        }
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