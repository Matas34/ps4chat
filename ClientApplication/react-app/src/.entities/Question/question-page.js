class QuestionPage {
    constructor(questionList = [], questionCount = 0) {
        this.#createEmptyQuestionPage();
    }

    static createQuestionPageFromParams(questionList = [], questionCount = 0) {
        const questionPage = new QuestionPage();
        questionPage.#createQuestionPageFromParams(questionList, questionCount);
        return questionPage;
    }

    #createEmptyQuestionPage() {
        this._questionList = [];
        this._questionCount = 0;
    }

    #createQuestionPageFromParams(questionList = [], questionCount = 0) {
        this._questionList = questionList;
        this._questionCount = questionCount;
    }

    // Getter for questionList
    get questions() {
        return this._questionList;
    }

    // Getter for questionCount
    get count() {
        return this._questionCount;
    }
}

export default QuestionPage;
