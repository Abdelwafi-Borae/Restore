using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{[Route("[Controller]")]
[ApiController]
    public class ProductController:ControllerBase
    {
                        public StoreContext _storeContext { get; }

        public ProductController(StoreContext storeContext)
        {
            _storeContext = storeContext;
        }
        
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProructs(){
            List<Product> products=await _storeContext.products.ToListAsync();
            return Ok(products);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id){
            Product products=await _storeContext.products.FindAsync(id);
            return Ok(products);
        }
    }
}