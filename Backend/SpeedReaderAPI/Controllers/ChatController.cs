// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SpeedReaderAPI.Entities;

namespace SpeedReaderAPI.Controllers
{
    [ApiController]
    [Route("api/chat")]
    public class ChatController : ControllerBase
    {
        private readonly IChatService _chat;

        public ChatController( IChatService chat )
        {
            _chat = chat;
        }

        // GET /api/chat/history
        [HttpGet("history")]
        public IEnumerable<ChatMessage> GetHistory()
            => _chat.GetMessages();

        // POST /api/chat/send
        [HttpPost("send")]
        public async Task<IActionResult> Send([FromBody] ChatMessage message)
        {
            if (string.IsNullOrEmpty(message.content))
            {
                return BadRequest();
            }
            await _chat.SendMessage(message);
            return Accepted();
        }
    }
}
