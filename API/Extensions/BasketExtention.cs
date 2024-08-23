using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class BasketExtention
{
    public static BasketDTO MapBasketToDTO(this Basket Basket)
    {
        return new BasketDTO
        {
            Id = Basket.Id,
            buyerId = Basket.BuyerId,
            Items = Basket.Items.Select(item => new BasketItemDTO
            {
                ProductId = item.ProductId,
                Name = item.Product.Name,
                Price = item.Product.Price,
                PictureUrl = item.Product.PictureUrl,
                Type = item.Product.Type,
                Brand = item.Product.Brand,
                quantity = item.Quantity
            }).ToList()
        };

    }
    public static IQueryable<Basket>ReteriveBasketWithItem(this IQueryable<Basket> query,string buyerId)
    {
        return query.Include(q => q.Items).ThenInclude(p => p.Product).Where(b => b.BuyerId == buyerId);
    }
}

