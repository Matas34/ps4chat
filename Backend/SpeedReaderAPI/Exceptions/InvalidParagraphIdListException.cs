namespace SpeedReaderAPI.Exceptions;

public class InvalidParagraphIdListException : Exception
{
    public InvalidParagraphIdListException()
    {
    }

    public InvalidParagraphIdListException(string message)
        : base(message)
    {
    }

    public InvalidParagraphIdListException(string message, Exception innerException)
        : base(message, innerException)
    {
    }
}
