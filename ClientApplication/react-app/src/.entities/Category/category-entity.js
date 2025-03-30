import { ValidationConstants, ValidationPatternConstants } from '../../.constants/MainConstants';

class Category {
    constructor() {
        this.#createEmptyCategory();
    }

    static createCategoryFromParams(title, text, id = null, imageFileName = null, articleIds = []) {
        const category = new Category();
        category.#createCategoryFromParams(title, text, id, imageFileName, articleIds);
        return category;
    }

    static createEmptyCategory() {
        return new Category();
    }

    static createCategoryFromCopy(category) {
        const newCategory = new Category();
        newCategory.#copyCategory(category);
        return newCategory;
    }

    #createCategoryFromParams(title, text, id = null, imageFileName = null, articleIds = []) {
        // Validate title
        // if (typeof title !== "string" ||
        //     title.length < ValidationConstants.MinTitleLength ||
        //     title.length > ValidationConstants.MaxTitleLength) {
        //     throw new Error(`Title must be a string between ${ValidationConstants.MinTitleLength} and ${ValidationConstants.MaxTitleLength} characters.`);
        // }
        // if (!ValidationPatternConstants.TitlePattern.test(title)) {
        //     throw new Error("Title does not match the required pattern.");
        // }

        // Validate text
        // if (typeof text !== "string" ||
        //     text.length < ValidationConstants.MinCategoryLength ||
        //     text.length > ValidationConstants.MaxCategoryLength) {
        //     throw new Error(`Text must be between ${ValidationConstants.MinTextLength} and ${ValidationConstants.MaxTextLength} characters.`);
        // }

        // Validate ID (if provided) id must be a number
        if (id !== null && typeof id !== "number") {
            throw new Error("ID must be a number.");
        }

        // Assign properties
        this._title = title;
        this._text = text;
        this._id = id;
        this._imageFileName = imageFileName;
        this._articleIds = articleIds;

    }

    #createEmptyCategory() {
        this._title = "";
        this._text = "";
        this._id = null;
        this._imageFileName = null;
        this._articleIds = [];
    }

    #copyCategory(category) {
        if (category.title === undefined) {
            throw new Error("Title is required.");
        }

        if (category.text === undefined) {
            throw new Error("Text is required.");
        }

        this._title = category.title;
        this._text = category.text;
        if (category.id) {
            this._id = category.id;
        } else {
            this._id = null;
        }
        if (category.imageFileName) {
            this._imageFileName = category.imageFileName;
        } else {
            this._imageFileName = null;
        }
        if (category.articleIds) {
            this._articleIds = category.articleIds;
        } else {
            this._articleIds = [];
        }
    }

    // Method to check if a field exists
    hasField(field) {
        return Object.prototype.hasOwnProperty.call(this, `_${field}`);
    }

    // Getters and Setters
    get title() {
        return this._title;
    }
    set title(value) {
        // if (typeof value !== "string" ||
        //     value.length < ValidationConstants.MinTitleLength ||
        //     value.length > ValidationConstants.MaxTitleLength) {
        //     throw new Error(`Title must be a string between ${ValidationConstants.MinTitleLength} and ${ValidationConstants.MaxTitleLength} characters.`);
        // }
        // if (!ValidationPatternConstants.TitlePattern.test(value)) {
        //     throw new Error("Title does not match the required pattern.");
        // }
        this._title = value;
    }
    static varTitleName() {
        return "title";
    }

    get text() {
        return this._text;
    }
    set text(value) {
        // if (typeof value !== "string" ||
        //     value.length < ValidationConstants.MinCategoryLength ||
        //     value.length > ValidationConstants.MaxCategoryLength) {
        //     throw new Error(`Text must be between ${ValidationConstants.MinTextLength} and ${ValidationConstants.MaxTextLength} characters.`);
        // }
        this._text = value;
    }   
    static varTextName() {
        return "text";
    }

    get id() {
        return this._id;
    }

    get imageFileName() {
        return this._imageFileName;
    }
    set imageFileName(value) {
        this._imageFileName = value;
    }
    static varImageFileName() {
        return "imageFileName";
    }

    get articleIds() {
        return this._articleIds;
    }
    static varArticleIds() {
        return "articleIds";
    }

}

export default Category;