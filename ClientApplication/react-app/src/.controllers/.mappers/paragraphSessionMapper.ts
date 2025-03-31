import { Paragraph, ParagraphSession, QuestionSession }  from "../../.entities/.MainEntitiesExport";
import { ParagraphSessionJson } from "../../.constants/MainConstants";  

class ParagraphSessionMapper {
    static toJson(paragraphSession: ParagraphSession): { [key: string]: any } {
        const json: { [key: string]: any } = {};
        
        json[ParagraphSessionJson.paragraphId] = paragraphSession.getParagraphId();
        json[ParagraphSessionJson.duration] = paragraphSession.getDuration();
        json[ParagraphSessionJson.wpm] = paragraphSession.getWpm();
        json[ParagraphSessionJson.correctQuestionCount] = paragraphSession.getQuestionSessions().filter(questionSession => questionSession.getCorrect()).length;
        console.log(json);

        return json;
    }

    static fromJson(data: { [key: string]: any }): ParagraphSession {
        let paragraphSession = ParagraphSession.createSession(
            data[ParagraphSessionJson.paragraphId],
            null,
            null,
            data[ParagraphSessionJson.wpm],
            null
        );

        let correctCount = data[ParagraphSessionJson.correctQuestionCount];
        let totalQuestionCount = data[ParagraphSessionJson.totalQuestionCount];

        let questionSessions: Array<QuestionSession> = [];

        for (let i = 0; i < totalQuestionCount; i++) {
            let questionSession = QuestionSession.createSession(null, null, i < correctCount, null);
            questionSessions.push(questionSession);
        }

        paragraphSession.setQuestionSessions(questionSessions);

        return paragraphSession;
    }
}

export default ParagraphSessionMapper;