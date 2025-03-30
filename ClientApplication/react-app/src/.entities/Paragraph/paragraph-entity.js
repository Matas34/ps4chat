import { ValidationConstants, ValidationPatternConstants } from '../../.constants/MainConstants';

class Paragraph {
    constructor() {
        this.#createEmptyParagraph();
    }

    static createParagraphFromParams(title, text, articleId, id = null, questionIDs = [], imageFileName = null) {
        const paragraph = new Paragraph();
        paragraph.#createParagraphFromParams(title, text, articleId, id, questionIDs, imageFileName);
        return paragraph;
    }

    static createEmptyParagraph() {
        return new Paragraph();
    }

    static createParagraphFromCopy(paragraph) {
        const newParagraph = new Paragraph();
        newParagraph.#copyParagraph(paragraph);
        return newParagraph;
    }

    #createParagraphFromParams(title, text, articleId, id = null, questionIDs = [], imageFileName = null) {
        // Validate title
        if (typeof title !== "string" ||
            title.length < ValidationConstants.MinTitleLength ||
            title.length > ValidationConstants.MaxTitleLength) {
            throw new Error(`Title must be a string between ${ValidationConstants.MinTitleLength} and ${ValidationConstants.MaxTitleLength} characters.`);
        }
        if (!ValidationPatternConstants.TitlePattern.test(title)) {
            throw new Error("Title does not match the required pattern.");
        }

        // Validate text
        if (typeof text !== "string" ||
            text.length < ValidationConstants.MinParagraphLength ||
            text.length > ValidationConstants.MaxParagraphLength) {
            throw new Error(`Text must be between ${ValidationConstants.MinTextLength} and ${ValidationConstants.MaxTextLength} characters.`);
        }

        // Validate articleId
        if (typeof articleId === "undefined" || articleId === null) {
            throw new Error("Article ID is required.");
        }

        // Validate ID (if provided) id must be a number
        if (id !== null && typeof id !== "number") {
            throw new Error("ID must be a number.");
        }

        // Validate question IDs (if provided)
        if (questionIDs && !Array.isArray(questionIDs)) {
            throw new Error("Question IDs must be an array.");
        }

        // Assign properties
        this._title = title;
        this._text = text;
        this._articleId = articleId;
        this._questionIDs = questionIDs; // Initialize questionIDs
        this._id = id
        this._imageFileName = imageFileName;
    }

    #createEmptyParagraph() {
        this._title = "";
        this._text = "";
        this._articleId = null;
        this._questionIDs = [];
        this._id = null;
        this._imageFileName = null;
    }

    #copyParagraph(paragraph) {
        if (paragraph.title === undefined) {
            throw new Error("Title is required.");
        }

        if (paragraph.text === undefined) {
            throw new Error("Text is required.");
        }

        if (paragraph.articleId === undefined) {
            throw new Error("Article ID is required.");
        }

        this._title = paragraph.title;
        this._text = paragraph.text;
        this._articleId = paragraph.articleId;
        if (paragraph.questionIDs) {
            this._questionIDs = paragraph.questionIDs;
        } else {
            this._questionIDs = [];
        }
        if (paragraph.id) {
            this._id = paragraph.id;
        } else {
            this._id = null;
        }
        if (paragraph.imageFileName) {
            this._imageFileName = paragraph.imageFileName
        } else {
            this._imageFileName = null;
        }
    }

    hasField(field) {
        return Object.prototype.hasOwnProperty.call(this, `_${field}`);
    }

    // Getters and setters
    get title() {
        return this._title;
    }
    set title(value) {
        // if (typeof value !== "string" ||
        //     value.length < ValidationConstants.MinTitleLength ||
        //     value.length > ValidationConstants.MaxTitleLength) {
        //     throw new Error(`Title must be a string between ${ValidationConstants.MinTitleLength} and ${ValidationConstants.MaxTitleLength} characters.`);
        // }
        this._title = value;
    }
    static varTitleName() {
        return "title"
    }

    get text() {
        return this._text;
    }
    set text(value) {
        // if (typeof value !== "string" ||
        //     value.length < ValidationConstants.MinTextLength ||
        //     value.length > ValidationConstants.MaxTextLength) {
        //     throw new Error(`Text must be between ${ValidationConstants.MinTextLength} and ${ValidationConstants.MaxTextLength} characters.`);
        // }
        this._text = value;
    }
    static varTextName() {
        return "text"
    }

    get articleId() {
        return this._articleId;
    }
    set articleId(value) {
        // if (typeof value !== "string") {
        //     throw new Error("Article ID must be a string.");
        // }
        this._articleId = value;
    }
    static varArticleIdName() {
        return "articleId"
    }

    get questionIDs() {
        return this._questionIDs;
    }
    set questionIDs(value) {
        // if (!Array.isArray(value)) {
        //     throw new Error("Question IDs must be an array.");
        // }
        this._questionIDs = value;
    }

    get nextParagraphId() {
        return this._nextParagraphId;
    }
    set nextParagraphId(value) {
        // if (value && typeof value !== "number") {
        //     throw new Error("Next paragraph ID must be a number.");
        // }
        this._nextParagraphId = value;
    }
    static varNextParagraphIdName() {
        return "nextParagraphId"
    }

    get imageFileName() {
        return this._imageFileName;
    }

    set imageFileName(value) {
        this._imageFileName = value;
    }

    resetImageFileName(){
        this._imageFileName = null;
    }

    get id() {
        return this._id;
    }
}

export default Paragraph;
