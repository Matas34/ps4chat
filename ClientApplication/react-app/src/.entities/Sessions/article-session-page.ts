import ArticleSession from './article-session';


class ArticleSessionPage {
    private _articleSessions: ArticleSession[];
    private _count: number;

    constructor() {
        this.#createEmptyPage();
    }

    #createEmptyPage() {
        this._articleSessions = [];
        this._count = 0;
    }

    static createArticleSessionPageFromParams(articleSessions: ArticleSession[], count: number): ArticleSessionPage {
        let newArticleSessionPage: ArticleSessionPage = new ArticleSessionPage();
        newArticleSessionPage.setArticleSessions(articleSessions);
        newArticleSessionPage.setCount(count);
        return newArticleSessionPage;
    }

    getArticleSessions(): ArticleSession[] {
        return this._articleSessions;
    }

    setArticleSessions(articleSessions: ArticleSession[]): void {
        this._articleSessions = articleSessions;
    }

    getCount(): number {
        return this._count;
    }

    setCount(count: number): void {
        this._count = count;
    }
}

export default ArticleSessionPage;