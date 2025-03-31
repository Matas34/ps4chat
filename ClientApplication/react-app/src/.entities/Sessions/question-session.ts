class QuestionSession {
    private sessionId?: Number;
    private questionId?: Number;
    private correct: Boolean;
    private startedAt: Date;

    constructor() {
        this.sessionId = undefined;
        this.questionId = undefined;
        this.correct = false;
        this.startedAt = new Date();
    }

    static createEmptySession(): QuestionSession {
        let newQuestion: QuestionSession = new QuestionSession();
        return newQuestion;
    }

    static createSession(questionId?: Number, sessionId?: Number, correct?: Boolean, startedAt?: Date): QuestionSession {
        let newQuestion: QuestionSession = new QuestionSession();
        // if (questionId !== undefined) {
        //     newQuestion.setQuestionId(questionId);
        // }
        // if (sessionId !== undefined) {
        //     newQuestion.setSessionId(sessionId);
        // }
        if (correct !== undefined) {
            newQuestion.setCorrect(correct);
        }
        // if (startedAt !== undefined) {
        //     newQuestion.setStartedAt(startedAt);
        // }
        return newQuestion;
    }

    // getSessionId(): Number | undefined {
    //     return this.sessionId;
    // }

    // setSessionId(sessionId: Number): void {
    //     this.sessionId = sessionId;
    // }

    // getQuestionId(): Number | undefined {
    //     return this.questionId;
    // }

    // setQuestionId(questionId: Number): void {
    //     this.questionId = questionId;
    // }

    getCorrect(): Boolean {
        return this.correct;
    }

    setCorrect(correct: Boolean): void {
        this.correct = correct;
    }

    // getStartedAt(): Date {
    //     return this.startedAt;
    // }

    // setStartedAt(startedAt: Date): void {
    //     this.startedAt = startedAt;
    // }
}

export default QuestionSession;