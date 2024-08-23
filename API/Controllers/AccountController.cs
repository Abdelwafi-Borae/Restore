using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Threading.Tasks;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    private UserManager<User> _userManager;
    public TokenService _TokenService { get; set; }
    public StoreContext _storeContext;
    public AccountController(UserManager<User> userManager, TokenService tokenService, StoreContext storeContext)
    {
        _userManager = userManager;
        _TokenService = tokenService;
        _storeContext = storeContext;
    }
    public DbIntializer df = new DbIntializer();
    //[HttpPost("userintilizer")]
    //public async Task<IActionResult>  userintilizer()
    //{ 


    //    if (!_userManager.Users.Any())
    //    {
    //        var user = new User { UserName = "bob", Email = "bob@test.com" };

    //        var response=await _userManager.CreateAsync(user, "Pa$$w0rd4");
    //        if (response.Succeeded)
    //        {
    //            var re =
    //            await _userManager.AddToRoleAsync(user, "Member");
    //            if (!re.Succeeded)
    //            {

    //                foreach (var error in re.Errors)
    //                {
    //                    ModelState.AddModelError(error.Code, error.Description);

    //                }
    //                return BadRequest();
    //            }
    //        }

    //        //  var admin = new User { UserName = "Admin", Email = "Admin@test.com" };
    //        //  /*await _userManager.a*/
    //        //  await _userManager.CreateAsync(admin, "Pa$$w0rd");
    //        //await this._userManager.AddToRoleAsync(admin, "Admin");

    //    }
    
    //    return Ok();
    //}

    [HttpPost("Login")]
    public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
    {

        var user = await _userManager.FindByNameAsync(loginDTO.Username);
        if (user == null || !await _userManager.CheckPasswordAsync(user, loginDTO.Password))
        {
            return Unauthorized();

        }
        var userbasket = await RetrieveBasket(loginDTO.Username);
        var nonbasket = await RetrieveBasket(Request.Cookies["buyerId"]);

        if (nonbasket != null)
        {
            if (userbasket != null) _storeContext.Baskets.Remove(userbasket);
            nonbasket.BuyerId = user.UserName;
            Response.Cookies.Delete("buyerId");
            await _storeContext.SaveChangesAsync();
        }


        return new UserDTO
        {
            Email = user.Email,
            Token = await _TokenService.GenerateToken(user),
            Basket = nonbasket != null ? nonbasket.MapBasketToDTO() : userbasket?.MapBasketToDTO()
              
        };
    }

    [HttpPost("Register")]
    public async Task<ActionResult> Register(RegisterDTO registerDTO)
    {
        
        var user = new User { UserName = registerDTO.Username, Email = registerDTO.Email };
        var result = await _userManager.CreateAsync(user,registerDTO.Password);
        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);

            }
            return ValidationProblem();
        }
        // await _userManager.AddToRoleAsync(user, "Member");
        return StatusCode(201);
    }

    [HttpGet("Getcurrentuser")]
    [Authorize]
    public async Task<ActionResult<UserDTO> >Getcurrentuser()
    {
        var userbasket = await RetrieveBasket(User.Identity.Name);
        var user = await _userManager.FindByNameAsync(User.Identity.Name);
        if (user == null) return null;
        return new UserDTO
        {
            Email = user.Email,
            Token = await _TokenService.GenerateToken(user),
            Basket= userbasket?.MapBasketToDTO() 

        };
    }
    [Authorize]
    [HttpGet("savedaddress")]
    public async Task<ActionResult<UserAddress>> getuseraddress()
    {
        return await _userManager.Users.
            Where(user => user.UserName == User.Identity.Name)
            .Select(u => u.Address).FirstOrDefaultAsync();
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
            .FirstOrDefaultAsync(b => b.BuyerId == buyerid);
        if (Basket == null) return null;
        return Basket;
    }
}

