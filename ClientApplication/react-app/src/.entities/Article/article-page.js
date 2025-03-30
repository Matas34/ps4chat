class ArticlePage {
    constructor() {
        this.#createEmptyArticlePage();
    }

    static createArticlePageFromParams(articleList = [], articleCount = 0) {
        const articlePage = new ArticlePage();
        articlePage.#createArticlePageFromParams(articleList, articleCount);
        return articlePage;
    }

    #createEmptyArticlePage() {
        this._articleList = [];
        this._articleCount = 0;
    }

    #createArticlePageFromParams(articleList = [], articleCount = 0) {
        this._articleList = articleList;
        this._articleCount = articleCount;
    }

    get articles() {
        return this._articleList;
    }

    get count() {
        return this._articleCount;
    }

}

export default ArticlePage;
