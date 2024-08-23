using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.OrderAggregates;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class OrderController : ControllerBase
{
    private StoreContext _StoreContext; 
        public OrderController(  StoreContext storeContext)
    {
        _StoreContext = storeContext;
    }
    [HttpGet]
    public async Task<ActionResult<List<OrderDTO>>> GetOrders()
    {
        var x = User.Identity.Name;
        return await _StoreContext.Orders
           .ProjectOrderToOrderDTO()
           .Where( c => c.BuyerId == User.Identity.Name)
           
            .ToListAsync();
    }
[HttpGet("{Id}",Name =  "GetOrder")]
    public async Task<IActionResult> GetOrder(int Id)
    {
        try
        {
            var order = await _StoreContext.Orders
           .ProjectOrderToOrderDTO()
            .Where(c => c.BuyerId == User.Identity.Name && c.Id == Id).FirstOrDefaultAsync();
            if (order == null) return NotFound();
            return Ok(order);
        }
        catch (Exception e) {
            throw new Exception(e.Message);
        }
        

        
    }
    [HttpPost]
    public async Task<ActionResult<int>> CreateOrder(CreateOrderDTO orderDTO)
    {
        var basket = await _StoreContext.Baskets.ReteriveBasketWithItem(User.Identity.Name).FirstOrDefaultAsync();
        if (basket == null) return BadRequest(new ProblemDetails { Title = "couldn't locate the basket" });
        var items = new List<OrederItem>();
        foreach (var item in basket.Items)
        {
            var productitem = await _StoreContext.products.FindAsync(item.ProductId);
            var itemordered = new ProductItemOrdered
            {
                PictureUrl = productitem.PictureUrl,
                Name = productitem.Name,
                productId = item.Id,
            };
            var orderitem = new OrederItem
            {
                ItemOrdered = itemordered,
                Price = productitem.Price,
                Quantity = item.Quantity
            };
            items.Add(orderitem);
            productitem.QuentityInStock -= item.Quantity;
        }
        var subtotal = items.Sum(i => i.Price * i.Quantity);
        var deleveryfee = subtotal > 10000 ? 0 : 500;
        var oreder = new Order
        {
            OrederItems = items,
            BuyerId = User.Identity.Name,
            ShippingAdress = orderDTO.ShippingAdress,
            SubTotal = subtotal,
            DeleveryFee = deleveryfee
        };
        _StoreContext.Orders.Add(oreder);
        _StoreContext.Baskets.Remove(basket);
        if (orderDTO.SavAddress)
        {
            var user = await _StoreContext.Users.FirstOrDefaultAsync(x => x.UserName == User.Identity.Name);
             
            var address= await _StoreContext.UserAddress.FirstOrDefaultAsync(x => x.UserId == user.Id);

             
            //_StoreContext.Update(user);
            if(address == null) {

                var newaddress = new UserAddress
                {
                    Address1 = orderDTO.ShippingAdress.Address1,
                    Address2 = orderDTO.ShippingAdress.Address2,
                    City = orderDTO.ShippingAdress.City,
                    Country = orderDTO.ShippingAdress.Country,
                    State = orderDTO.ShippingAdress.State,
                    FullName = orderDTO.ShippingAdress.FullName,
                    UserId = user.Id,
                     Id = user.Id,
                     Zip= orderDTO.ShippingAdress.Zip,

                };

                _StoreContext.UserAddress.Add(newaddress);

               // _StoreContext.SaveChanges();
            } 
            else {
                
                address.Address1 = orderDTO.ShippingAdress.Address1;
                address.Address2 = orderDTO.ShippingAdress.Address2;
                address.City = orderDTO.ShippingAdress.City;
                address.Country = orderDTO.ShippingAdress.Country;
                address.State = orderDTO.ShippingAdress.State;
                address.FullName = orderDTO.ShippingAdress.FullName;
                address.Zip = orderDTO.ShippingAdress.Zip;
                _StoreContext.UserAddress.Update(address);
            }
            

        
            //_StoreContext.Users.Update(user);
        }
        var RESULT =await _StoreContext.SaveChangesAsync() > 0;
        if (RESULT) return CreatedAtRoute("GetOrder",new { id = oreder.Id },oreder.Id);
        return BadRequest("problem creating order");
         
    }

}
