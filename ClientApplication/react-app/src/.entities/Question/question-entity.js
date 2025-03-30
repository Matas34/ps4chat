import { ValidationConstants, ValidationPatternConstants } from '../../.constants/MainConstants';

class Question {
    constructor() {
        this.#createEmptyQuestion();
    }

    static createQuestionFromParams(text, paragraphId, answerChoices = [], correctAnswerIndex = 0, id = null, imageFileName = null) {
        const question = new Question();
        question.#createQuestionFromParams(text, paragraphId, answerChoices, correctAnswerIndex, id, imageFileName);
        return question;
    }

    static createEmptyQuestion() {
        return new Question();
    }

    static createQuestionFromCopy(question) {
        const newQuestion = new Question();
        newQuestion.#copyQuestion(question);
        return newQuestion;
    }

    #createQuestionFromParams(text, paragraphId, answerChoices = [], correctAnswerIndex = 0, id = null, imageFileName = null) {
        // Validate text
        if (typeof text !== "string" ||
            text.length < ValidationConstants.MinQuestionTextLength ||
            text.length > ValidationConstants.MaxQuestionTextLength) {
            throw new Error(`Text must be a string between ${ValidationConstants.MinQuestionTextLength} and ${ValidationConstants.MaxQuestionTextLength} characters.`);
        }

        // Validate paragraphId
        if (typeof paragraphId === "undefined" || paragraphId === null) {
            throw new Error("Paragraph ID is required.");
        }

        // Validate answer choices
        if (answerChoices && !Array.isArray(answerChoices)) {
            throw new Error("Answer choices must be an array.");
        }

        // Validate correct answer index
        if (typeof correctAnswerIndex !== "number" || correctAnswerIndex < 0 || correctAnswerIndex >= answerChoices.length) {
            throw new Error(`Correct answer index must be a number between 0 and ${answerChoices.length - 1}.`);
        }

        // Validate ID (if provided) id must be a number
        if (id !== null && typeof id !== "number") {
            throw new Error("ID must be a number.");
        }

        // Assign properties
        this._text = text;
        this._paragraphId = paragraphId;
        this._answerChoices = answerChoices;
        this._correctAnswerIndex = correctAnswerIndex;
        this._id = id;
        this._imageFileName = imageFileName;

    }

    #createEmptyQuestion() {
        this._text = "";
        this._paragraphId = null;
        this._answerChoices = [];
        this._correctAnswerIndex = 0;
        this._id = null;
        this._imageFileName = null;
    }

    #copyQuestion(question) {
        if (question.text === undefined) {
            throw new Error("Text is required.");
        }

        if (question.paragraphId === undefined) {
            throw new Error("Paragraph ID is required.");
        }

        this._text = question.text;
        this._paragraphId = question.paragraphId;
        if (question.answerChoices) {
            this._answerChoices = question.answerChoices;
        } else {
            this._answerChoices = [];
        }
        if (question.correctAnswerIndex) {
            this._correctAnswerIndex = question.correctAnswerIndex;
        } else {
            this._correctAnswerIndex = 0;
        }
        if (question.id) {
            this._id = question.id;
        } else {
            this._id = null;
        }
        if (question.imageFileName) {
            this._imageFileName = question.imageFileName
        } else {
            this._imageFileName = null;
        }
    }

    // Method to check if a field exists
    hasField(field) {
        return Object.prototype.hasOwnProperty.call(this, `_${field}`);
    }

    get text() {
        return this._text;
    }
    set text(value) {
        // if (typeof value !== "string" ||
        //     value.length < ValidationConstants.MinTextLength ||
        //     value.length > ValidationConstants.MaxTextLength) {
        //     throw new Error(`Text must be a string between ${ValidationConstants.MinTextLength} and ${ValidationConstants.MaxTextLength} characters.`);
        // }
        this._text = value;
    }
    static varTextName() {
        return "text"
    }

    get paragraphId() {
        return this._paragraphId;
    }
    set paragraphId(value) {
        // if (typeof value === "undefined" || value === null) {
        //     throw new Error("Paragraph ID is required.");
        // }
        this._paragraphId = value;
    }
    static varParagraphIdName() {
        return "paragraphId"
    }

    get answerChoices() {
        return this._answerChoices;
    }
    set answerChoices(value) {
        if (value && Array.isArray(value)) {
            this._answerChoices = value;
        }
    }
    static varAnswerChoicesName() {
        return "answerChoices"
    }

    get correctAnswerIndex() {
        return this._correctAnswerIndex;
    }

    set correctAnswerIndex(value) {
        // if (typeof value !== "number" || value < 0 || value >= this._answerChoices.length) {
        //     throw new Error(`Correct answer index must be a number between 0 and ${this._answerChoices.length - 1}.`);
        // }
        this._correctAnswerIndex = value;
    }
    static varCorrectAnswerIndexName() {
        return "correctAnswerIndex"
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

export default Question;
