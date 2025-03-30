using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpeedReaderAPI.Data.Migrations
{
    /// <inheritdoc />
    public partial class validationSettingsEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ValidationSettings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaxTitleLength = table.Column<int>(type: "int", nullable: false),
                    MinTitleLength = table.Column<int>(type: "int", nullable: false),
                    MaxQuestionTextLength = table.Column<int>(type: "int", nullable: false),
                    MinQuestionTextLength = table.Column<int>(type: "int", nullable: false),
                    MaxAnswerChoiceLength = table.Column<int>(type: "int", nullable: false),
                    MinAnswerChoicesCount = table.Column<int>(type: "int", nullable: false),
                    MaxParagraphLength = table.Column<int>(type: "int", nullable: false),
                    MinParagraphLength = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ValidationSettings", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "ValidationSettings",
                columns: new[] { "Id", "MaxAnswerChoiceLength", "MaxParagraphLength", "MaxQuestionTextLength", "MaxTitleLength", "MinAnswerChoicesCount", "MinParagraphLength", "MinQuestionTextLength", "MinTitleLength" },
                values: new object[] { 1, 255, 1500, 255, 255, 2, 10, 5, 3 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ValidationSettings");
        }
    }
}
