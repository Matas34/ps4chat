import { ArticleSession, ArticleSessionPage } from "../../.entities/.MainEntitiesExport";
import { ArticleSessionJson, ArticleSessionPageJson } from "../../.constants/MainConstants";
import ParagraphSessionMapper from "./paragraphSessionMapper";

class ArticleSessionMapper {
    static toJson(articleSession: ArticleSession): { [key: string]: any } {
        const json: { [key: string]: any } = {};
        
            json[ArticleSessionJson.articleId] = articleSession.getArticleId();
            console.log(json);
            json[ArticleSessionJson.paragraphSession] = articleSession.getParagraphSessions().map(paragraphSession => ParagraphSessionMapper.toJson(paragraphSession));

            console.log(json);
        return json;
    }

    static fromJson(data: { [key: string]: any }): ArticleSession {
        let articleSession =  ArticleSession.createSession(
            data[ArticleSessionJson.articleId],
            data[ArticleSessionJson.id],
            data[ArticleSessionJson.time]
        );

        articleSession.setParagraphSessions(data[ArticleSessionJson.paragraphs].map(paragraphSession => ParagraphSessionMapper.fromJson(paragraphSession)));

        return articleSession;
    }
}


class ArticleSessionPageMapper {
    static fromJson(data: { [key: string]: any }) : ArticleSessionPage {
        
        let count = data[ArticleSessionPageJson.count];
        let sessions = data[ArticleSessionPageJson.items].map(articleSession => ArticleSessionMapper.fromJson(articleSession));

        return ArticleSessionPage.createArticleSessionPageFromParams(sessions, count);
    }
}


export { ArticleSessionMapper, ArticleSessionPageMapper };