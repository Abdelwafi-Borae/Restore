namespace API.Entities.OrderAggregates
{
    public class Order
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public ShippingAdress ShippingAdress { get; set; }
        public DateTime OrderDate = DateTime.Now;
        public List<OrederItem>  OrederItems{ get; set; }
        public long SubTotal { get; set; }
        public long DeleveryFee { get; set; }
        public OrderStatus OrderStatus { get; set; }=OrderStatus.Pending;
        public long GetTotal()
        {
            return SubTotal + DeleveryFee;
        }
    }
}
