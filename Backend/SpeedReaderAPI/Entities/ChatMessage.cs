// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace SpeedReaderAPI.Entities
{
    public class ChatMessage
    {
        public string sender { get; set; }
        public string content { get; set; }

        public ChatMessage(string sender, string content)
        {
            this.sender = sender;
            this.content = content;
        }




    }
}
