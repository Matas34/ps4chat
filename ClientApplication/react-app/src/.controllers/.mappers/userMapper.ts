import { User } from "../../.entities/.MainEntitiesExport";
import { UserJson } from "../../.constants/MainConstants";
class UserMapper {
    static fromJson(data) {
        return User.createUserFromParams(
            data[UserJson.username],
            data[UserJson.id],
            data[UserJson.role],
            data[UserJson.token]
        );
    }

    static toJsonStorage(user: User) {
        const json = {};

        if (user._username) {
            json[UserJson.username] = user._username;
        }

        if (user._id) {
            json[UserJson.id] = user._id;
        }

        if (user._role) {
            json[UserJson.role] = user._role;
        }

        if (user._token) {
            json[UserJson.token] = user._token;
        }

        return json;
    }

    static fromJsonStorage(data) {
        return User.createUserFromParams(
            data[UserJson.username],
            data[UserJson.id],
            data[UserJson.role],
            data[UserJson.token]
        );
    }

    static toJsonLogin(user) {
        const json = {};

        if (user._password) {
            json[UserJson.password] = user._password;
        }

        if (user._email) {
            json[UserJson.email] = user._email;
        }

        return json;
    }

    static toJsonRegister(user) {
        const json = {};

        if (user._username) {
            json[UserJson.username] = user._username;
        }

        if (user._password) {
            json[UserJson.password] = user._password;
        }

        if (user._email) {
            json[UserJson.email] = user._email;
        }

        return json;
    }
}

export { UserMapper };