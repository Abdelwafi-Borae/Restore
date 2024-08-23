using API.Data;
using API.Entities;
using API.Midleware;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var connection=builder.Configuration.GetConnectionString("defaultconnection");
builder.Services.AddDbContext<StoreContext>(opt=>opt.UseSqlServer(connection,s=>s.EnableRetryOnFailure()) );
var Url=builder.Configuration.GetValue<string>("Url");
builder.Services.AddCors(option=>{
    option.AddDefaultPolicy(builder =>
    builder.WithOrigins(Url).AllowAnyMethod().AllowAnyHeader().AllowCredentials());
});
builder.Services.AddIdentityCore<User>()
    .AddRoles<Role>()
    .AddEntityFrameworkStores<StoreContext>();
builder.Services.AddScoped<TokenService>();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
{
opt.TokenValidationParameters=new TokenValidationParameters 
{ 
    ValidateIssuer = false,
    ValidateAudience = false,
    ValidateLifetime = true,
    ValidateIssuerSigningKey = true,
    IssuerSigningKey= new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWTSettings:TokenKey"]))

};
});
var app = builder.Build();
app.UseMiddleware<ExceptionMidleWare>();

//dlf
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  //  app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthentication(); 
app.UseAuthorization();

app.MapControllers();

app.Run();
