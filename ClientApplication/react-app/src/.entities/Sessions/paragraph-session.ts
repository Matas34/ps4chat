import QuestionSession from "./question-session";

class ParagraphSession {
    private sessionId?: Number;
    private paragraphId?: Number;
    private duration: Number;
    private wpm: Number;
    private startedAt: Date;
    private questionSessions: Array<QuestionSession>;

    constructor() {
        this.sessionId = undefined;
        this.paragraphId = undefined;
        this.duration = 0;
        this.wpm = 0;
        this.startedAt = new Date();
    }

    static createEmptySession(): ParagraphSession {
        let newParagraph: ParagraphSession = new ParagraphSession();
        return newParagraph;
    }

    static createSession(paragraphId?: Number, sessionId?: Number, duration?: Number, wpm?: Number, startedAt?: Date): ParagraphSession {
        let newParagraph: ParagraphSession = new ParagraphSession();
        if (paragraphId !== undefined) {
            newParagraph.setParagraphId(paragraphId);
        }
        // if (sessionId !== undefined) {
        //     newParagraph.setSessionId(sessionId);
        // }
        if (duration !== undefined) {
            newParagraph.setDuration(duration);
        }
        if (wpm !== undefined) {
            newParagraph.setWpm(wpm);
        }
        // if (startedAt !== undefined) {
        //     newParagraph.setStartedAt(startedAt);
        // }
        return newParagraph;
    }

    // getSessionId(): Number | undefined {
    //     return this.sessionId;
    // }

    // setSessionId(sessionId: Number): void {
    //     this.sessionId = sessionId;
    // }

    getParagraphId(): Number | undefined {
        return this.paragraphId;
    }

    setParagraphId(paragraphId: Number): void {
        this.paragraphId = paragraphId;
    }

    getDuration(): Number {
        return Math.floor(this.duration as number);
    }

    setDuration(duration: Number): void {
        this.duration = duration;
    }

    getWpm(): Number {
        return this.wpm;
    }

    setWpm(wpm: Number): void {
        this.wpm = wpm;
    }

    // getStartedAt(): Date {
    //     return this.startedAt;
    // }

    // setStartedAt(startedAt: Date): void {
    //     this.startedAt = startedAt;
    // }

    getQuestionSessions(): Array<QuestionSession> {
        return this.questionSessions;
    }

    addQuestionSession(questionSession: QuestionSession): void {
        this.questionSessions.push(questionSession);
    }

    setQuestionSessions(questionSessions: Array<QuestionSession>): void {
        this.questionSessions = questionSessions;
    }
}

export default ParagraphSession;