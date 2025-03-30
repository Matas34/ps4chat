class User {
    constructor() {
        this.#createEmptyUser();
    }

    static createUserFromParams(username, id = null, role = 0, token = null) {
        const user = new User();
        user.#createUserFromParams(username, id, role, token);
        return user;
    }

    static createEmptyUser() {
        return new User();
    }

    static createUserFromCopy(user) {
        const newUser = new User();
        newUser.#copyUser(user);
        return newUser;
    }

    #createUserFromParams(username, id = null, role = 0, token = null) {
        // Validate username
        if (typeof username !== "string") {
            throw new Error(`Username is needed.`);
        }
        // if (!ValidationPatternConstants.UsernamePattern.test(username)) {
            // throw new Error("Username does not match the required pattern.");
        // }

        // Validate password
        // if (typeof password !== "string") {
            // throw new Error(`Password is needed.`);
        // }

        // Validate email
        // if (typeof email !== "string") {
        //     throw new Error(`Email is needed.`);
        // }
        // if (!ValidationPatternConstants.EmailPattern.test(email)) {
            // throw new Error("Email does not match the required pattern.");
        // }

        // Validate ID (if provided) id must be a number
        if (id !== null && typeof id !== "number") {
            throw new Error("ID must be a number.");
        }

        // Validate role
        if (typeof role !== "number" || role < 0 || role > 1) {
            throw new Error("Role must be a number between 0 and 1.");
        }

        // Assign properties
        this._username = username;
        this._password = "";
        this._email = "";
        this._id = id;
        this._role = role;
        this._token = token;
    }

    #createEmptyUser() {
        this._username = "";
        this._password = "";
        this._email = "";
        this._id = null;
        this._role = 0;
        this._token = null;
    }

    #copyUser(user) {
        if (user.username === undefined) {
            throw new Error("Username is required.");
        }

        if (user.password === undefined) {
            throw new Error("Password is required.");
        }

        if (user.email === undefined) {
            throw new Error("Email is required.");
        }

        this._username = user.username;
        this._password = user.password;
        this._email = user.email;
        if (user.id) {
            this._id = user.id;
        } else {
            this._id = null;
        }
        if (user.role) {
            this._role = user.role;
        } else {
            this._role = 0;
        }
    }

    // Method to check if a field exists
    hasField(field) {
        return Object.prototype.hasOwnProperty.call(this, `_${field}`);
    }

    // Getters and setters
    get username() {
        return this._username;
    }

    set username(username) {
        this._username = username;
    }
    static varUsername() {
        return "username";
    }

    get password() {
        return this._password;
    }

    set password(password) {
        this._password = password;
    }
    static varPassword() {
        return "password";
    }

    get email() {
        return this._email;
    }

    set email(email) {
        this._email = email;
    }
    static varEmail() {
        return "email";
    }

    get id() {
        return this._id;
    }

    get role() {
        return this._role;
    }
    static varRole() {
        return "role";
    }

    get token() {
        return this._token;
    }
    static varToken() {
        return this._token;
    }


}

export default User;