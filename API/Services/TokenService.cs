using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Services
{
    public class TokenService
    {
        private UserManager<User> _userManager;
        private IConfiguration _configuration;
        public TokenService(UserManager<User> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }  
        public async Task<String> GenerateToken(User user)
        {
            var cliams = new List<Claim> 
            {
                new Claim(ClaimTypes.Email,user.Email),
                new Claim(ClaimTypes.Name,user.UserName) 
            };
            var roles = await _userManager.GetRolesAsync(user);
            foreach(var role in roles) {
                cliams.Add(new Claim( ClaimTypes.Role, role )); };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWTSettings:TokenKey"]));
            var creds = new  SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var TokenOption=new JwtSecurityToken(
                issuer:null,
                audience:null,
                expires:DateTime.Now.AddDays(7),
                signingCredentials:creds,
                claims:cliams);
            return new JwtSecurityTokenHandler().WriteToken(TokenOption);
                
        }

    }
}
