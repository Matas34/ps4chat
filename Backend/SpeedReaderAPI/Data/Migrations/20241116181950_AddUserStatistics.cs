using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpeedReaderAPI.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddUserStatistics : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "ArticlesCountRead",
                table: "User",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "CorrectQuestions",
                table: "User",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "SecondsRead",
                table: "User",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "TotalQuestions",
                table: "User",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "WordsRead",
                table: "User",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ArticlesCountRead",
                table: "User");

            migrationBuilder.DropColumn(
                name: "CorrectQuestions",
                table: "User");

            migrationBuilder.DropColumn(
                name: "SecondsRead",
                table: "User");

            migrationBuilder.DropColumn(
                name: "TotalQuestions",
                table: "User");

            migrationBuilder.DropColumn(
                name: "WordsRead",
                table: "User");
        }
    }
}
