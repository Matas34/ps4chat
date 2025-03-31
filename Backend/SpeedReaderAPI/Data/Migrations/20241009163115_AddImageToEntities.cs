using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpeedReaderAPI.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddImageToEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageFileName",
                table: "Question",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ImageMimeType",
                table: "Question",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageFileName",
                table: "Paragraph",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ImageMimeType",
                table: "Paragraph",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageFileName",
                table: "Article",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ImageMimeType",
                table: "Article",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageFileName",
                table: "Question");

            migrationBuilder.DropColumn(
                name: "ImageMimeType",
                table: "Question");

            migrationBuilder.DropColumn(
                name: "ImageFileName",
                table: "Paragraph");

            migrationBuilder.DropColumn(
                name: "ImageMimeType",
                table: "Paragraph");

            migrationBuilder.DropColumn(
                name: "ImageFileName",
                table: "Article");

            migrationBuilder.DropColumn(
                name: "ImageMimeType",
                table: "Article");
        }
    }
}
