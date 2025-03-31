using Microsoft.EntityFrameworkCore;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.Entities;

public class DBHelperMethods
{
    // Separate method to handle initial data seeding
    public static void SeedInitialData(ApplicationContext context)
    {
        AddUser(context);
        AddCategory(context);
        AddArticle(context);
        AddParagraph(context, context.Article.Last().Id);
        AddQuestion(context, context.Paragraph.Last().Id);
        AddArticleSession(context);
    }

    public static void SeedUserData(ApplicationContext context)
    {
        AddUser(context);
        AddArticleSession(context);
    }

    public static void AddArticleSession(ApplicationContext context)
    {
        User user = getUser(context);

        var article = new Article { Title = "abcderfgh", CategoryTitle = "abcderfgh", UserId = getUser(context).Id };
        context.Article.Add(article);
        context.SaveChanges();
        var paragraph1 = new Paragraph { Title = "a", Text = "few words. few words.", ArticleId = 2, UserId = getUser(context).Id };
        var paragraph2 = new Paragraph { Title = "a", Text = "many words. many words. many words.", ArticleId = 2, UserId = getUser(context).Id };
        context.Paragraph.Add(paragraph1);
        context.Paragraph.Add(paragraph2);
        context.SaveChanges();

        var articleSession = new ArticleSession
        {
            UserId = user.Id,
            ArticleId = article.Id,
            Time = DateTime.Now,
            Wpm = 250,
            CorrectQuestionCount = 5,
            TotalQuestionCount = 10
        };
        context.ArticleSession.Add(articleSession);
        context.SaveChanges();

        var paragraphSession1 = new ParagraphSession
        {
            ArticleSessionId = articleSession.Id,
            ParagraphId = paragraph1.Id,
            DurationInSeconds = 60,
            Wpm = 250,
            CorrectQuestionCount = 3,
            TotalQuestionCount = 5
        };
        var paragraphSession2 = new ParagraphSession
        {
            ArticleSessionId = articleSession.Id,
            ParagraphId = paragraph1.Id,
            DurationInSeconds = 30,
            Wpm = 100,
            CorrectQuestionCount = 0,
            TotalQuestionCount = 5
        };
        context.ParagraphSession.Add(paragraphSession1);
        context.ParagraphSession.Add(paragraphSession2);
        context.SaveChanges();
    }


    public static void AddUser(ApplicationContext context, string username = "TestUser", string email = "email@email.com", string Password = "$2a$11$tImiPnCT57boieMc8i2Jle627H1hUwZ7FlMqcqBScbzPDbORjLAr." /*password*/, Role role = Role.ADMIN)
    {
        context.User.Add(new User { Username = username, Email = email, Password = Password, Role = role });
        context.SaveChanges();
    }

    public static User getUser(ApplicationContext context)
    {
        var usr = context.User.FirstOrDefault();
        if (usr == null)
        {
            throw new Exception("User is null. FAILED SEEDING DATA");
        }
        return usr;
    }


    public static void AddArticle(ApplicationContext context, string title = "Sample Article", string categoryTitle = "Sample Category")
    {
        context.Article.Add(new Article { Title = title, CategoryTitle = categoryTitle, UserId = getUser(context).Id, CategoryIds=[GetFirstCategoryId(context)] });
        context.SaveChanges();
    }
    public static void AddCategory(ApplicationContext context, string title = "Sample title", string text = "Sample text")
    {
        context.Category.Add(new Category { Title = title, Text = text, UserId = getUser(context).Id });
        context.SaveChanges();
    }
    public static void AddParagraph(ApplicationContext context, int articleId, string title = "Test Paragraph", string text = "Test Content")
    {
        context.Paragraph.Add(new Paragraph { Title = title, Text = text, ArticleId = articleId, UserId = getUser(context).Id });
        context.SaveChanges();
    }

    private static readonly string[] entity = ["help", "C# struggle", "haskell pain"];
    public static void AddQuestion(ApplicationContext context, int paragraphId, string question = "Test Question", string[] answer = default!, int correctAnswerIndex = 1)
    {
        context.Question.Add(new Question { QuestionText = question, AnswerChoices = answer ?? entity, ParagraphId = paragraphId, CorrectAnswerIndex = correctAnswerIndex, UserId = getUser(context).Id });
        context.SaveChanges();
    }

    public static int GetFirstArticleId(ApplicationContext context)
    {
        var art = context.Article.FirstOrDefault();
        if (art == null)
        {
            throw new Exception("ArticleId is null. FAILED SEEDING DATA");
        }
        return art.Id;
    }

    public static int GetFirstParagraphId(ApplicationContext context)
    {
        var par = context.Paragraph.FirstOrDefault();
        if (par == null)
        {
            throw new Exception("ParagraphId is null. FAILED SEEDING DATA");
        }
        return par.Id;
    }

    internal static int GetFirstQuestionId(ApplicationContext context)
    {
        var question = context.Question.FirstOrDefault();
        if (question == null)
        {
            throw new Exception("QuestionId is null. FAILED SEEDING DATA");
        }
        return question.Id;
    }

    internal static int GetFirstCategoryId(ApplicationContext context)
    {
        var cat = context.Category.FirstOrDefault();
        if (cat == null)
        {
            throw new Exception("QuestionId is null. FAILED SEEDING DATA");
        }
        return cat.Id;
    }
}