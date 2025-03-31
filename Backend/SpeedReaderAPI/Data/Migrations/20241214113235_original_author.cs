using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpeedReaderAPI.Data.Migrations
{
    /// <inheritdoc />
    public partial class original_author : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OriginalAuthor",
                table: "Article",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OriginalAuthor",
                table: "Article");
        }
    }
}
