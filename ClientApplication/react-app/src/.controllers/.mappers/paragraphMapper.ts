import { Paragraph, ParagraphPage } from "../../.entities/.MainEntitiesExport";
import { ParagraphJson, ParagraphPageJson } from "../../.constants/MainConstants";
class ParagraphMapper {
    static fromJson(data) {
        return Paragraph.createParagraphFromParams(
            data[ParagraphJson.title], 
            data[ParagraphJson.text], 
            data[ParagraphJson.articleId],
            data[ParagraphJson.id],
            data[ParagraphJson.questionIds] || [],
            data[ParagraphJson.imageFileName]
        );
    }

    static toJson(paragraph) {
        const json = {};
        
        if (paragraph._title) {
            json[ParagraphJson.title] = paragraph._title;
        }

        if (paragraph._id) {
            json[ParagraphJson.id] = paragraph._id;
        }

        if (paragraph._text) {
            json[ParagraphJson.text] = paragraph._text;
        }

        if (paragraph._articleId) {
            json[ParagraphJson.articleId] = paragraph._articleId;
        }

        return json;
    }
}

class ParagraphPageMapper {
    static fromJson(data) {
        return ParagraphPage.createParagraphPageFromParams(
            data[ParagraphPageJson.paragraphs].map(paragraph => ParagraphMapper.fromJson(paragraph)),
            data[ParagraphPageJson.count]
        );
    }
}

export { ParagraphMapper, ParagraphPageMapper };