using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var connection=builder.Configuration.GetConnectionString("defaultconnection");
builder.Services.AddDbContext<StoreContext>(opt=>opt.UseSqlite(connection));
var Url=builder.Configuration.GetValue<string>("Url");
builder.Services.AddCors(option=>{
option.AddDefaultPolicy(builder=>
builder.WithOrigins(Url).AllowAnyMethod().AllowAnyHeader());});
var app = builder.Build();


//dlf
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthorization();

app.MapControllers();

app.Run();
