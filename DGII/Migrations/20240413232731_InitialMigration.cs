using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DGII.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TaxPayers",
                columns: table => new
                {
                    TaxId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaxPayers", x => x.TaxId);
                });

            migrationBuilder.CreateTable(
                name: "TaxReceipts",
                columns: table => new
                {
                    TaxReceiptNumber = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TaxPayerId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Amount = table.Column<float>(type: "real", nullable: false),
                    TaxAmount = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaxReceipts", x => x.TaxReceiptNumber);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TaxPayers");

            migrationBuilder.DropTable(
                name: "TaxReceipts");
        }
    }
}
