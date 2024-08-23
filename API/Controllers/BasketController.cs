using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BasketController : ControllerBase
{
    public StoreContext _storeContext { get; }

    public BasketController(StoreContext storeContext)
    {
        _storeContext = storeContext;
    }


    [HttpGet(Name= "GetBasket")]
    public async Task<ActionResult<BasketDTO>> GetBasket()
    {
        var Basket = await RetrieveBasket(GetBuyerId());
        if (Basket == null) return NotFound();
        return  Basket.MapBasketToDTO();
    }

   

    [HttpPost]
    public async Task<ActionResult> AddItemToBasket(int ProductId, int Quantity)
    {
        var Basket = await RetrieveBasket(GetBuyerId());
        //if basket notfound create new basket
        if (Basket == null) Basket = CreateBasket();
        var product = await _storeContext.products.FindAsync(ProductId);
        if (product == null) BadRequest(new ProblemDetails { Title = "product not found" });
        Basket.AddItem(product, Quantity);
        var result = await _storeContext.SaveChangesAsync() > 0;

        if (result) return CreatedAtRoute("GetBasket",  Basket.MapBasketToDTO());
        return BadRequest(new ProblemDetails { Title = "problim saving item to basket" });
    }



    [HttpDelete]
    public async Task<ActionResult> RemoveItemfromBasket(int ProductId, int Quantity)
    {
        var Basket = await RetrieveBasket(GetBuyerId());
        if (Basket == null) return NotFound();
        Basket.RemoveItem(ProductId, Quantity);
        var result = await _storeContext.SaveChangesAsync() > 0;
        if (result) return StatusCode(201);
        return BadRequest(new ProblemDetails { Title = "problim removing item to basket" });


    }
    private async Task<Basket?> RetrieveBasket(string? buyerid)
    {
        if (string.IsNullOrEmpty(buyerid))
        {
            Response.Cookies.Delete("buyerId");
            return null;
        }
    
        var Basket = await _storeContext.Baskets
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(b => b.BuyerId ==buyerid); 
        if (Basket == null)  return null;
        return Basket;
    }
    private string? GetBuyerId()
    {
        return User.Identity?.Name ?? Request.Cookies["buyerId"];
    }
    private Basket? CreateBasket()
    {
        var buyerId = User.Identity?.Name;
        if (string.IsNullOrEmpty(buyerId))
        {
            buyerId = Guid.NewGuid().ToString();
            var CookieOption = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId", buyerId, CookieOption);
        }
        var basket = new Basket { BuyerId = buyerId };
        _storeContext.Baskets.Add(basket);
        return basket;
    }
     
}
