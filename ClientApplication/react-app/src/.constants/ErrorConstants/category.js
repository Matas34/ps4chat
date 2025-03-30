const CategoryErrors = {
    type: "category",

    PostError(){
        return `Could not post ${this.type}`;
    },

    GetError(){
        return `Could not get ${this.type}`;
    },

    PutError(){
        return `Could not put ${this.type}`;
    },

    DeleteError(){
        return `Could not delete ${this.type}`;
    },

    PostImageError(){
        return `Could not post image for ${this.type}`
    },

    DeleteImageError(){
        return `Could not delete image for ${this.type}`
    },

    GetImageError(){
        return `Could not get image for ${this.type}`
    }
}

const CategoryPageErrors = {
    type: "category page",

    GetError(){
        return `Could not get ${this.type}`;
    },

    SearchError(){
        return `Could not search ${this.type}`;
    }
}

export { CategoryErrors, CategoryPageErrors };