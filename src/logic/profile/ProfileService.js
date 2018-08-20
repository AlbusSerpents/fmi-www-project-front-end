import ProfileHandler from '../../networking/ProfileHandler'

class ProfileService {

    constructor(userId, sessionId) {
        const handler = new ProfileHandler(userId, sessionId);

        this.getClient = function () {
            const noResponse = {
                name: null,
                loginName: null,
                facultyNumber: null,
                email: null,
                success: false,
                sessionId: sessionId
            };

            return handler.getProfile()
                .then(response => response === null ? noResponse :
                    {
                        name: response.name,
                        loginName: response.username,
                        facultyNumber: response.facultyNumber,
                        email: response.email,
                        success: true
                    });
        }

        this.updateClient = function (update) {
            const passwords = getPasswords(update);
            const email = getEmail(update);

            const request = {
                email: email,
                passwordRequest: passwords
            };

            return Promise
                .resolve(request)
                .then(request => handler.updateProfile(request))
                .then(() => 'Update successfull');
        }

        const getEmail = function (update) {
            return update.newEmail === null ? update.oldEmail : update.newEmail;
        }

        const getPasswords = function (update) {
            if (update.newPassword === null && update.oldPassword === null) {
                return null;
            } else {
                return {
                    originalPassword: update.oldPassword,
                    newPassword: update.newPassword
                };
            }
        }
    }

}

export default ProfileService;