import { Article, ArticlePage } from "../../.entities/.MainEntitiesExport";
import { ArticleJson, ArticlePageJson, ArticleListJson } from "../../.constants/MainConstants";
class ArticleMapper {
    static fromJson(data) {
        return Article.createArticleFromParams(
            data[ArticleJson.title], 
            null, 
            data[ArticleJson.paragraphIds]  || [],
            data[ArticleJson.id],
            data[ArticleJson.imageFileName],
            data[ArticleJson.author],
            data[ArticleJson.publisher],
            data[ArticleJson.url],
            data[ArticleJson.language],
            data[ArticleJson.categoryIds] || []
        );
    }

    static toJson(article) {
        const json = {};
        
        if (article._title) {
            json[ArticleJson.title] = article._title;
        }

        // if (article._categoryTitle) {
        //     json[ArticleJson.categoryTitle] = article._categoryTitle;
        // }

        if (article._id) {
            json[ArticleJson.id] = article._id;
        }

        // if (article._paragraphIDs) {
            // json[ArticleJson.paragraphIds] = article._paragraphIDs;
        // }

        if (article._author) {
            json[ArticleJson.author] = article._author;
        }

        if (article._publisher) {
            json[ArticleJson.publisher] = article._publisher;
        }

        if (article._url) {
            json[ArticleJson.url] = article._url;
        }

        if (article._language) {
            json[ArticleJson.language] = article._language;
        }

        if (article._categories) {
            json[ArticleJson.categoryIds] = article._categories;
        }


        return json;
    }
}

class ArticlePageMapper {
    static fromJson(data) {
        return ArticlePage.createArticlePageFromParams(
            data[ArticlePageJson.articles].map(article => ArticleMapper.fromJson(article)),
            data[ArticlePageJson.count]
        );
    }

    /**
     * @deprecated this one is used to support old data format of page
     * @param {*} data 
     * @returns 
     */
    static fromJsonList(data) {
        return ArticlePage.createArticlePageFromParams(
            data[ArticleListJson.articles].map(article => ArticleMapper.fromJson(article)),
            data[ArticleListJson.count]
        );
    }
}


export { ArticleMapper, ArticlePageMapper,  };