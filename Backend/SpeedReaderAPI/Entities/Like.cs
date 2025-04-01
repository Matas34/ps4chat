// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace SpeedReaderAPI.Entities
{
    public class Like
    {

        public long UserId { get; set; }
        public User User { get; set; }

        public int ArticleId { get; set; }
        public Article Article { get; set; }

       public Like(long userId, int articleId)
        {

            UserId = userId;
            ArticleId = articleId;

        }

    }
}
