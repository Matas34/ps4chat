import ParagraphSession from "./paragraph-session";

class ArticleSession {
    private sessionId?: Number;
    private articleId?: Number;
    private startedAt: Date;
    private paragraphSessions: Array<ParagraphSession>;


    constructor() {
        this.sessionId = undefined;
        this.articleId = undefined;
        this.startedAt = new Date();
        this.paragraphSessions = [];
    }

    static createEmptySession(): ArticleSession {
        let newArticle: ArticleSession = new ArticleSession();
        return newArticle;
    }

    static createSession(articleId?: Number, sessionId?: Number, startedAt?: Date): ArticleSession {
        let newArticle: ArticleSession = new ArticleSession();
        if (articleId !== undefined) {
            newArticle.setArticleId(articleId);
        }
        if (sessionId !== undefined) {
            newArticle.setSessionId(sessionId);
        }
        if (startedAt !== undefined) {
            newArticle.setStartedAt(startedAt);
        }
        return newArticle;
    }

    getSessionId(): Number | undefined {
        return this.sessionId;
    }

    private setSessionId(sessionId: Number): void {
        this.sessionId = sessionId;
    }

    getArticleId(): Number | undefined {
        return this.articleId;
    }

    setArticleId(articleId: Number): void {
        this.articleId = articleId;
    }

    getStartedAt(): Date {
        return this.startedAt;
    }

    private setStartedAt(startedAt: Date): void {
        this.startedAt = startedAt;
    }

    getParagraphSessions(): Array<ParagraphSession> {
        return this.paragraphSessions;
    }

    addParagraphSession(paragraphSession: ParagraphSession): void {
        this.paragraphSessions.push(paragraphSession);
    }

    setParagraphSessions(paragraphSessions: Array<ParagraphSession>): void {
        this.paragraphSessions = paragraphSessions;
    }

}

export default ArticleSession;