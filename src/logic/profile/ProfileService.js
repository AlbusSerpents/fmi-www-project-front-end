import ProfileHandler from '../../networking/ProfileHandler'

class ProfileService {

    constructor(userId, sessionId) {
        const clientRole = 'c';

        console.log(sessionId);

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

            return handler.getProfile(clientRole)
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
            var passwords;
            if (update.newPassword !== update.oldPassword) {
                return Promise.resolve({ message: 'Both passwords should match', refresh: false });
            } else if (update.newPassword === null && update.oldPassword === null) {
                passwords = null;
            } else {
                passwords = {
                    originalPassword: update.oldPassword,
                    newPassword: update.newPassword
                };
            }

            const email = update.newEmail === null ? update.oldEmail : update.newEmail;

            const request = {
                email: email,
                role: clientRole,
                passwordRequest: passwords
            };

            return handler.updateProfile(request);
        }
    }

}

export default ProfileService;