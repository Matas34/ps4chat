class ParagraphPage {
    constructor(paragraphList = [], paragraphCount = 0) {
        this.#createEmptyParagraphPage();
    }

    static createParagraphPageFromParams(paragraphList = [], paragraphCount = 0) {
        const paragraphPage = new ParagraphPage();
        paragraphPage.#createParagraphPageFromParams(paragraphList, paragraphCount);
        return paragraphPage;
    }

    #createEmptyParagraphPage() {
        this._paragraphList = [];
        this._paragraphCount = 0;
    }

    #createParagraphPageFromParams(paragraphList = [], paragraphCount = 0) {
        this._paragraphList = paragraphList;
        this._paragraphCount = paragraphCount;
    }

    // Getter for paragraphList
    get paragraphs() {
        return this._paragraphList;
    }

    // Getter for paragraphCount
    get count() {
        return this._paragraphCount;
    }
}

export default ParagraphPage;
