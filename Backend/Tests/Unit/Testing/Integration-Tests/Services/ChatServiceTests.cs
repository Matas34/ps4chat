namespace Unit;

using System.Collections.Concurrent;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Moq;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Services.Impl;
using Xunit;

public class ChatServiceTests
{
    [Fact]
    public async Task SendMessage_Should_StoreAndBroadcast_AndTrimExcess()
    {
       
        var history = new InMemoryChatHistory();

        
        var mockClientProxy = new Mock<IClientProxy>();
        var mockClients = new Mock<IHubClients>();
        mockClients
            .Setup(c => c.All)
            .Returns(mockClientProxy.Object);

        var mockHubCtx = new Mock<IHubContext<ChatHub>>();
        mockHubCtx
            .SetupGet(x => x.Clients)
            .Returns(mockClients.Object);

        var svc = new ChatService(history, mockHubCtx.Object);

        
        for (int i = 0; i < 105; i++)
        {
            await svc.SendMessage(new ChatMessage($"u{i}", $"{i}"));
        }

       
        Assert.Equal(100, history.messages.Count);

        
        mockClientProxy.Verify(
            p => p.SendCoreAsync(
                "ReceiveMessage",
                It.Is<object[]>(args =>
                    args.Length == 1
                    && args[0] != null
                    && args[0].GetType() == typeof(ChatMessage)
                ),
                It.IsAny<CancellationToken>()
            ),
            Times.Exactly(105)
        );
    }
}