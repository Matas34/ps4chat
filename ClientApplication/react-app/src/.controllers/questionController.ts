import { QuestionService } from "./.services/.MainServices";
import { StatusHelper } from "./.dataProcessingHelpers/DataProccessingHelpersExport";
import { QuestionErrors, QuestionPageErrors } from "../.constants/MainConstants";
import { QuestionMapper, QuestionPageMapper } from "./.mappers/questionMapper";
class QuestionController {
    static async Post(Question) {
        try {
            let jsonData = QuestionMapper.toJson(Question);
            const response = await QuestionService.postQuestion(jsonData);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${QuestionErrors.PostError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return QuestionMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }

    static async Get(id) {
        try {
            const response = await QuestionService.getQuestion(id);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${QuestionErrors.GetError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return QuestionMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }

    static async Put(Question) {
        try {
            let jsonData = QuestionMapper.toJson(Question);
            const response = await QuestionService.putQuestion(jsonData);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${QuestionErrors.PutError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return QuestionMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }

    static async Delete(id) {
        try {
            const response = await QuestionService.deleteQuestion(id);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${QuestionErrors.DeleteError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async Search(query) {
        try {
            const response = await QuestionService.getQuestionsByTitle(query);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${QuestionPageErrors.SearchError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return QuestionPageMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }

    static async PostImage(questionId, file){
        try {
            const response = await QuestionService.postImage(questionId, file);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${QuestionErrors.PostImageError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async GetImage(questionId){
        try {
            const response = await QuestionService.getImage(questionId);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${QuestionErrors.GetImageError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async DeleteImage(questionId){
        try {
            const response = await QuestionService.deleteImage(questionId);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${QuestionErrors.DeleteImageError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export { QuestionController }