// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using Microsoft.AspNetCore.SignalR;
using SpeedReaderAPI.Entities;

namespace SpeedReaderAPI.Services.Impl
{
    public class ChatService : IChatService
    {
        private readonly InMemoryChatHistory       _history;
        private readonly IHubContext<ChatHub> _hub;

        public ChatService(
            InMemoryChatHistory history,
            IHubContext<ChatHub> hubContext
            )
        {
            _history = history;
            _hub     = hubContext;
        }

        public IEnumerable<ChatMessage> GetMessages()
            => _history.GetMessages();

        public async Task SendMessage(ChatMessage message)
        {

            _history.Add(message);


            while (_history.messages.Count > 100)
                _history.RemoveMessage();


            await _hub.Clients
                .All
                .SendAsync("ReceiveMessage", message);
        }
    }
}
