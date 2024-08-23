using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class UserAddress:Address
    {
        [Key]
        public int Id { get; set; }
        User User { get; set; }
        public int  UserId { get; set; }
    }
}
