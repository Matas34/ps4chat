const ArticleSessionErrors = {
    type: "article session",

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

const ArticlePageSessionErrors = {
    type: "article page session",

    GetError(){
        return `Could not get ${this.type}`;
    },

    SearchError(){
        return `Could not search for ${this.type}`;
    }
}

export { ArticleSessionErrors, ArticlePageSessionErrors };