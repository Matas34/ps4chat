import { User } from "../../../.entities/.MainEntitiesExport";

class UserManager {
  static saveUser(user: User) {
    localStorage.setItem('_username', user._username);
    localStorage.setItem('_id', user._id);
    localStorage.setItem('_role', user._role);
    localStorage.setItem('_token', user._token);
  }

  static getUser(): User | null {
    const username = localStorage.getItem('_username');
    const id = localStorage.getItem('_id');
    const role = localStorage.getItem('_role');
    const token = localStorage.getItem('_token');

    // console.log(username, id, role, token);

    if (username && id && role && token) {
      return User.createUserFromParams(username, Number(id), Number(role), token);
    }

    // console.log('UserManager.getUser() null');
    return null;
  }

  static deleteUser() {
    localStorage.removeItem('_username');
    localStorage.removeItem('_id');
    localStorage.removeItem('_role');
    localStorage.removeItem('_token');
  }
}

export default UserManager;