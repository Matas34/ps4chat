
Unit tests are a type of software testing where individual units or components of a software are tested in isolation from the rest of the application. The purpose of unit tests is to validate that each unit of the software performs as expected. 

Mocks are used in unit tests to simulate the behavior of real objects. This allows the tester to focus on testing the functionality of the unit without being concerned about the dependencies or the interactions with other components. Mocks can be used to mimic the behavior of complex objects, control the test environment, and verify that certain methods are called with expected parameters.

### In short: Use mocks

example:

```
        // _mockMapper = new Mock<IMapper>();
        // _mockMapper.Setup(m => m.Map<Question>(It.IsAny<QuestionCreateRequest>()))
        //     .Returns((QuestionCreateRequest source) =>
        //     {
        //         return new Question
        //         {
        //             Id = 1,
        //             ParagraphId = source.ParagraphId,
        //             QuestionText = source.QuestionText,
        //             Answers = source.Answers,
        //             CorrectAnswer = source.CorrectAnswer
        //         };
        //     });
```