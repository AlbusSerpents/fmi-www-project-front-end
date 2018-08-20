import ManageHandler from '../../networking/ManageHandler'

class ManageService {

    constructor(sessionId) {
        const handler = new ManageHandler(sessionId);

        this.getClients = function () {
            return handler.getClients();
        }

        this.deleteClient = function (clientId) {
            return handler
                .deleteProfile(clientId)
                .then(any => 'Profile Deleted');
        }
    }

}

export default ManageService;