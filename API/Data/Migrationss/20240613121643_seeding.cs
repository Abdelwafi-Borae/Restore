using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrationss
{
    public partial class seeding : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "products",
                columns: new[] { "Id", "Brand", "Description", "Name", "PictureUrl", "Price", "QuentityInStock", "Type" },
                values: new object[] { 1, "VS Code", "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.", "Blue Code Gloves", "/images/products/glove-code1.png", 1800L, 100, "Gloves" });

            migrationBuilder.InsertData(
                table: "products",
                columns: new[] { "Id", "Brand", "Description", "Name", "PictureUrl", "Price", "QuentityInStock", "Type" },
                values: new object[] { 2, "NetCore", "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.", "Core Purple Boots", "/images/products/boot-core1.png", 19999L, 100, "Boots" });

            migrationBuilder.InsertData(
                table: "products",
                columns: new[] { "Id", "Brand", "Description", "Name", "PictureUrl", "Price", "QuentityInStock", "Type" },
                values: new object[] { 7, "Redis", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.", "Core Red Boots", "/images/products/boot-core2.png", 18999L, 100, "Boots" });

            migrationBuilder.InsertData(
                table: "products",
                columns: new[] { "Id", "Brand", "Description", "Name", "PictureUrl", "Price", "QuentityInStock", "Type" },
                values: new object[] { 23, "VS Code", "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.", "Green Code Gloves", "/images/products/glove-code2.png", 1500L, 100, "Gloves" });

            migrationBuilder.InsertData(
                table: "products",
                columns: new[] { "Id", "Brand", "Description", "Name", "PictureUrl", "Price", "QuentityInStock", "Type" },
                values: new object[] { 65, "Redis", "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.", "Redis Red Boots", "/images/products/boot-redis1.png", 25000L, 100, "Boots" });

            migrationBuilder.InsertData(
                table: "products",
                columns: new[] { "Id", "Brand", "Description", "Name", "PictureUrl", "Price", "QuentityInStock", "Type" },
                values: new object[] { 76, "Angular", "Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.", "Angular Purple Boots", "/images/products/boot-ang2.png", 15000L, 100, "Boots" });

            migrationBuilder.InsertData(
                table: "products",
                columns: new[] { "Id", "Brand", "Description", "Name", "PictureUrl", "Price", "QuentityInStock", "Type" },
                values: new object[] { 321, "React", "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.", "Green React Gloves", "/images/products/glove-react2.png", 1400L, 100, "Gloves" });

            migrationBuilder.InsertData(
                table: "products",
                columns: new[] { "Id", "Brand", "Description", "Name", "PictureUrl", "Price", "QuentityInStock", "Type" },
                values: new object[] { 333, "React", "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.", "Purple React Gloves", "/images/products/glove-react1.png", 1600L, 100, "Gloves" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "products",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "products",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "products",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "products",
                keyColumn: "Id",
                keyValue: 65);

            migrationBuilder.DeleteData(
                table: "products",
                keyColumn: "Id",
                keyValue: 76);

            migrationBuilder.DeleteData(
                table: "products",
                keyColumn: "Id",
                keyValue: 321);

            migrationBuilder.DeleteData(
                table: "products",
                keyColumn: "Id",
                keyValue: 333);
        }
    }
}
