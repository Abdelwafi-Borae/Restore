using API.Entities.OrderAggregates;

namespace API.DTOs
{
    public class CreateOrderDTO
    {
        public bool SavAddress { get; set; }
        public ShippingAdress ShippingAdress { get; set; }
    }
}
