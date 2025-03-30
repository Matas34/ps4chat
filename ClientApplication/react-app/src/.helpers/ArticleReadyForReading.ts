import { ArticleController, ParagraphController, QuestionController} from '../.controllers/.MainControllersExport';

class ArticleReadyForReading {
    public static async isArticleReadyForReading(id: number) {
        try {
            const article = await ArticleController.Get(id);
            if (article.paragraphIDs.length > 0) {
                for (let i = 0; i < article.paragraphIDs.length; i++) {
                    const paragraph = await ParagraphController.Get(article.paragraphIDs[i]);
                    if (paragraph.questionIDs.length > 0) {
                    } else {
                        return false;
                    }
                }
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
        
        return true;
    }
}

export  { ArticleReadyForReading };