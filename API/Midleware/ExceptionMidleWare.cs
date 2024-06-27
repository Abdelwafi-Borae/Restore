using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace API.Midleware
{
    public class ExceptionMidleWare
    {
        public RequestDelegate Next;
        public ILogger<ExceptionMidleWare> Logger;
        public IHostEnvironment Env;
        public ExceptionMidleWare(RequestDelegate next,ILogger<ExceptionMidleWare> logger,IHostEnvironment env)
        {
            Next = next;
            Logger = logger;
            Env = env;
        }

      public async Task InvokeAsync(HttpContext context) {
            try
            {
                await Next(context);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex,ex.Message);
                context.Response.ContentType = "appliction/json";
                context.Response.StatusCode = 500;
                var respose = new ProblemDetails
                {
                    Status = 500,
                    Title = ex.Message,
                    Detail = Env.IsDevelopment() ? ex.StackTrace?.ToString() : null
                };
                var options=new JsonSerializerOptions { PropertyNamingPolicy=JsonNamingPolicy.CamelCase };
                var json=JsonSerializer.Serialize(respose,options);
                await context.Response.WriteAsync(json);
            }
        }
    }
}
