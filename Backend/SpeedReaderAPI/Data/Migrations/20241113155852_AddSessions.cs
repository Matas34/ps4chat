using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpeedReaderAPI.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddSessions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ArticleSession",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    ArticleId = table.Column<int>(type: "int", nullable: false),
                    Time = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArticleSession", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ArticleSession_Article_ArticleId",
                        column: x => x.ArticleId,
                        principalTable: "Article",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ArticleSession_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ParagraphSession",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ArticleSessionId = table.Column<long>(type: "bigint", nullable: false),
                    ParagraphId = table.Column<int>(type: "int", nullable: false),
                    DurationInSeconds = table.Column<int>(type: "int", nullable: false),
                    Wpm = table.Column<int>(type: "int", nullable: false),
                    CorrectQuestionCount = table.Column<int>(type: "int", nullable: false),
                    TotalQuestionCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParagraphSession", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ParagraphSession_ArticleSession_ArticleSessionId",
                        column: x => x.ArticleSessionId,
                        principalTable: "ArticleSession",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ParagraphSession_Paragraph_ParagraphId",
                        column: x => x.ParagraphId,
                        principalTable: "Paragraph",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ArticleSession_ArticleId",
                table: "ArticleSession",
                column: "ArticleId");

            migrationBuilder.CreateIndex(
                name: "IX_ArticleSession_UserId",
                table: "ArticleSession",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ParagraphSession_ArticleSessionId",
                table: "ParagraphSession",
                column: "ArticleSessionId");

            migrationBuilder.CreateIndex(
                name: "IX_ParagraphSession_ParagraphId",
                table: "ParagraphSession",
                column: "ParagraphId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ParagraphSession");

            migrationBuilder.DropTable(
                name: "ArticleSession");
        }
    }
}
