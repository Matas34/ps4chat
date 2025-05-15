// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using System.Collections.Concurrent;

namespace SpeedReaderAPI.Entities
{
    public class InMemoryChatHistory
    {
        public readonly ConcurrentQueue<ChatMessage> messages;

        public InMemoryChatHistory()
        {
            messages = new ConcurrentQueue<ChatMessage>();
        }


        public void Add(ChatMessage msg)
        {
            messages.Enqueue(msg);

        }

        public void RemoveMessage()
        {
            messages.TryDequeue(out _);
        }
        public IEnumerable<ChatMessage> GetMessages()
        {
            return messages.ToArray();
        }
    }
}
