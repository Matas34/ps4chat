import { CreateEditArticle, ArticleList, ReturnToArticlesButton, ArticleListFromArray } from "./Articles/.MainArticlesExport";
import { CreateEditParagraph, listOfParagraphs } from  "./Paragraphs/.MainParagraphsExport";
import { CreateEditQuestion, listOfQuestions } from  "./Questions/.MainQuestionsExport";
import { QuestionComponent } from  "./Exercise/.MainExerciseExport";
import { FlashingText } from  "./HomePage/.MainHomePageExport";
import { CreateEditCategory, ReturnToCategoriesButton, CategoryList, ShowCategory } from "./Categories/.MainCategoryExport";
import { SignUp, LogIn, Profile } from "./User/.MainUserExport";


// Export components/functions individually
export { CreateEditArticle, ArticleList, ReturnToArticlesButton, ArticleListFromArray };
export { CreateEditParagraph };
export { CreateEditQuestion };
export { QuestionComponent };
export { FlashingText };
export { listOfParagraphs as ParagraphList };
export { listOfQuestions as QuestionList };
export { CreateEditCategory, ReturnToCategoriesButton, CategoryList, ShowCategory };
export { SignUp, LogIn, Profile}

// Export as grouped objects (optional, if you need them grouped)
export const MainArticles = {
    CreateEditArticle,
    ArticleList,
    ReturnToArticlesButton
};

export const MainParagraphs = {
    CreateEditParagraph
};

export const MainQuestions = {
    CreateEditQuestion
};

//const CreateEditArticle = React.lazy(() => import('./Articles/CreateEditArticle'));
//const ArticleList = React.lazy(() => import('./Articles/ArticleList'));