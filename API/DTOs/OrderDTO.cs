using API.Entities.OrderAggregates;
using API.Entities;

namespace API.DTOs
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public ShippingAdress ShippingAdress { get; set; }
        public DateTime OrderDate { get; set; }
        public List<OrderItemDTO> OrederItems { get; set; }
        public long SubTotal { get; set; }
        public long DeleveryFee { get; set; }
        public string OrderStatus { get; set; }
        public long Total { get; set; }

    }
}
