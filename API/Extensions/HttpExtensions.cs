using API.Entities;
using API.RequestHelpers;
using System.Text.Json;

namespace API.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginationHeader( this HttpResponse response,MetaData metaData)
        {
            var option = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            response.Headers.Add("Pagination", JsonSerializer.Serialize(metaData,option));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");

        }
    }
}
