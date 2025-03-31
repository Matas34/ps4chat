const UserErrors = {
    type: "user",

    PostError(){
        return `Could not post ${this.type}`;
    },

    LoginError(){
        return `Could not login ${this.type}`;
    },

    RegisterErrorAlreadyLoggedIn(){
        return `Could not register ${this.type} because user is already logged in`;
    },

    LogginErrorAlreadyLoggedIn(){
        return `Could not login ${this.type} because user is already logged in`;
    },

    PostImageError(){
        return `Could not post image for ${this.type}`
    },

    DeleteImageError(){
        return `Could not delete image for ${this.type}`
    },

    GetImageError(){
        return `Could not get image for ${this.type}`
    },

    GetInfoError(){
        return `Could not get info for ${this.type}`
    }
}

export { UserErrors };