using API.DTOs;
using API.Entities.OrderAggregates;

namespace API.Extensions
{
    public static class OrderExtension
    {
        public static IQueryable<OrderDTO>  ProjectOrderToOrderDTO(this IQueryable<Order> query)
        {
            return query.Select(order => new OrderDTO
            {
                Id = order.Id,
                BuyerId = order.BuyerId,
                OrderDate = order.OrderDate,
                DeleveryFee = order.DeleveryFee,
                OrderStatus = order.OrderStatus.ToString(),
                ShippingAdress = order.ShippingAdress,
                SubTotal = order.SubTotal,
                Total = order.GetTotal(),
                OrederItems=order.OrederItems.Select(item=>new OrderItemDTO
                {
                    Name=item.ItemOrdered.Name,
                    PictureURL=item.ItemOrdered.PictureUrl,
                    Price=item.Price,
                    ProductId=item.ItemOrdered.productId ,
                    Quantity=item.Quantity,
                }).ToList(),
            });
        }
    }
}
