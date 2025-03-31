import { UserService } from "./.services/.MainServices";
import { StatusHelper, UserManager } from "./.dataProcessingHelpers/DataProccessingHelpersExport";
import { UserErrors } from "../.constants/MainConstants";
import { UserMapper, UserInfoMapper } from "./.mappers/.MainMappersExport";
import { User, UserInfo } from "../.entities/.MainEntitiesExport";

class UserController {
    static async Post(User: User): Promise<void> {
        try {
            if (UserManager.getUser() !== null) {
                throw new Error(UserErrors.RegisterErrorAlreadyLoggedIn());
            }
            let jsonData = UserMapper.toJsonRegister(User);
            const response = await UserService.postUser(jsonData)
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${UserErrors.PostError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return;
        } catch (error) {
            throw error;
        }
    }

    static async Login(User: User): Promise<User> {
        try {
            if (UserManager.getUser() !== null) {
                throw new Error(UserErrors.LogginErrorAlreadyLoggedIn());
            }
            let jsonData = UserMapper.toJsonLogin(User);
            const response = await UserService.loginUser(jsonData)
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${UserErrors.LoginError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            UserManager.saveUser(UserMapper.fromJson(response));
            return UserMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }

    static async Logout(): Promise<void> {
        try {
            UserManager.deleteUser();
        } catch (error) {
            throw error;
        }
    }

    static async GetUser(): Promise<User> {
        try {
            return UserManager.getUser();
        } catch (error) {
            throw error;
        }
    }

    static async IsLoggedIn(): Promise<boolean> {
        try {
            return UserManager.getUser() !== null;
        } catch (error) {
            throw error;
        }
    }

    static async GetInfo(): Promise<UserInfo> {
        try {
            let response = await UserService.getUserInfo();
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${UserErrors.GetInfoError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return UserInfoMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }

    static async PostImage(file: File): Promise<void> {
        try {
            const response = await UserService.postImage(file);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${UserErrors.PostImageError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return;
        } catch (error) {
            throw error;
        }
    }

    static async GetImage(userId: number) {
        try {
            const response = await UserService.getImage(userId);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${UserErrors.GetImageError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async DeleteImage(): Promise<void> {
        try {
            const response = await UserService.deleteImage();
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${UserErrors.DeleteImageError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return;
        } catch (error) {
            throw error;
        }
    }
}

export { UserController };