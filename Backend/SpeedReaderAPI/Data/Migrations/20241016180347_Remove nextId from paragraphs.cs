using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpeedReaderAPI.Data.Migrations
{
    /// <inheritdoc />
    public partial class RemovenextIdfromparagraphs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "nextParagraphId",
                table: "Paragraph");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "nextParagraphId",
                table: "Paragraph",
                type: "int",
                nullable: true);
        }
    }
}
