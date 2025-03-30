import { ArticleSessionService } from "./.services/.MainServices";
import { StatusHelper } from "./.dataProcessingHelpers/DataProccessingHelpersExport";
import { ArticleSessionErrors, ArticlePageSessionErrors as ArticleSessionPageErrors } from "../.constants/MainConstants";
import { ArticleSessionMapper, ArticleSessionPageMapper } from "./.mappers/.MainMappersExport";
import { ArticleSession, ArticleSessionPage } from "../.entities/.MainEntitiesExport";

class ArticleSessionController {
    static async Post(ArticleSession: ArticleSession) {
        try {
            let jsonData = ArticleSessionMapper.toJson(ArticleSession);
            const response = await ArticleSessionService.postArticleSession(jsonData)
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${ArticleSessionErrors.PostError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
        } catch (error) {
            throw error;
        }
    }

    static async Get(startDate: String, endDate: String) : Promise<ArticleSessionPage> {
        try {
            const response = await ArticleSessionService.getArticleSession(startDate, endDate);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${ArticleSessionPageErrors.GetError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return ArticleSessionPageMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }
}

export { ArticleSessionController };