

using SpeedReaderAPI.Entities;

public interface IChatService
{
    public Task SendMessage(ChatMessage message);
    public IEnumerable<ChatMessage> GetMessages();
}
