import { Question, QuestionPage } from "../../.entities/.MainEntitiesExport";
import { QuestionJson, QuestionPageJson } from "../../.constants/MainConstants";

class QuestionMapper {
    static fromJson(data) {
        return Question.createQuestionFromParams(
            data[QuestionJson.questionText], 
            data[QuestionJson.paragraphId] || null,
            data[QuestionJson.answerChoices] || [],
            data[QuestionJson.correctAnswerIndex],
            data[QuestionJson.id], 
            data[QuestionJson.imageFileName]
        );
    }

    static toJson(question) {
        const json = {};
        
        if (question._text) {
            json[QuestionJson.questionText] = question._text;
        }

        if (question._id) {
            json[QuestionJson.id] = question._id;
        }

        if (question._correctAnswerIndex !== null) {
            json[QuestionJson.correctAnswerIndex] = question._correctAnswerIndex;
        }

        if (question._paragraphId) {
            json[QuestionJson.paragraphId] = question._paragraphId;
        }

        if (question._answerChoices) {
            json[QuestionJson.answerChoices] = question._answerChoices;
        }

        return json;
    }
}

class QuestionPageMapper {
    static fromJson(data) {
        return QuestionPage.createQuestionPageFromParams(
            data[QuestionPageJson.questions].map(question => QuestionMapper.fromJson(question)),
            data[QuestionPageJson.count]
        );
    }
}

export { QuestionMapper, QuestionPageMapper };