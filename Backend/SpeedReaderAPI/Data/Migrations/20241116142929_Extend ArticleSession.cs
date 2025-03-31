using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpeedReaderAPI.Data.Migrations
{
    /// <inheritdoc />
    public partial class ExtendArticleSession : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CorrectQuestionCount",
                table: "ArticleSession",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TotalQuestionCount",
                table: "ArticleSession",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Wpm",
                table: "ArticleSession",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CorrectQuestionCount",
                table: "ArticleSession");

            migrationBuilder.DropColumn(
                name: "TotalQuestionCount",
                table: "ArticleSession");

            migrationBuilder.DropColumn(
                name: "Wpm",
                table: "ArticleSession");
        }
    }
}
