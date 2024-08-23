namespace API.Entities.OrderAggregates
{
    public class OrederItem
    {
        public int Id { get; set; }
        public ProductItemOrdered ItemOrdered { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
    }
}
