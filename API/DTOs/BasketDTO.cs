namespace API.DTOs
{
    public class BasketDTO
    {
        public int Id { get; set; }
        public string buyerId { get; set; }
        
        public List<BasketItemDTO> Items { get; set; }




    }
}
