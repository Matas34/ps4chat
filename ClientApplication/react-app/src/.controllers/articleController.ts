import { ArticleService } from "./.services/.MainServices";
import { StatusHelper } from "./.dataProcessingHelpers/DataProccessingHelpersExport";
import { ArticleErrors, ArticlePageErrors } from "../.constants/MainConstants";
import { ArticleMapper, ArticlePageMapper } from "./.mappers/articleMapper";
class ArticleController {
    static async Post(Article) {
        try {
            let jsonData = ArticleMapper.toJson(Article);
            const response = await ArticleService.postArticle(jsonData)
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${ArticleErrors.PostError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return ArticleMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }

    static async Get(id) {
        try {
            const response = await ArticleService.getArticle(id);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${ArticleErrors.GetError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return ArticleMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }

    static async GetRandom(){
        try {
            const response = await ArticleService.getRandomArticle();
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${ArticleErrors.GetRandomError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return ArticleMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }

    static async Put(Article) {
        try {
            let jsonData = ArticleMapper.toJson(Article);
            const response = await ArticleService.putArticle(jsonData);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${ArticleErrors.PutError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return ArticleMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }

    static async Delete(id) {
        try {
            const response = await ArticleService.deleteArticle(id);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${ArticleErrors.DeleteError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async GetPage(page: number, userId?: number) {
        try {
            const response = await ArticleService.getArticles(page, userId);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${ArticlePageErrors.GetError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return ArticlePageMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }

    static async Search(query?: string, userId?: number) {
        try {
            const response = await ArticleService.getArticleByQuery(query, userId);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${ArticlePageErrors.SearchError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return ArticlePageMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }

    static async Page(page: number, userId?: number, search?: string) {
        try {
            const response = await ArticleService.pageArticles(page, userId, search);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${ArticlePageErrors.PageError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return ArticlePageMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }

    static async PostImage(articleId, file){
        try {
            const response = await ArticleService.postImage(articleId, file);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${ArticleErrors.PostImageError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async GetImage(articleId){
        try {
            const response = await ArticleService.getImage(articleId);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${ArticleErrors.GetImageError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async DeleteImage(articleId){
        try {
            const response = await ArticleService.deleteImage(articleId);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${ArticleErrors.DeleteImageError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export { ArticleController }