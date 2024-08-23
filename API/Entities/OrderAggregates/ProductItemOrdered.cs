using Microsoft.EntityFrameworkCore;

namespace API.Entities.OrderAggregates
{
    [Owned]
    public class ProductItemOrdered
    {
        public int productId { get; set; }
        public string Name { get; set; }
        public string PictureUrl { get; set; }
    }
}
