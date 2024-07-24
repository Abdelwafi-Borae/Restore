using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductController:ControllerBase
{
                    public StoreContext _storeContext { get; }

    public ProductController(StoreContext storeContext)
    {
        _storeContext = storeContext;
    }
    
    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProructs([FromQuery]ProductPrams productPrams)
    {
        var query = _storeContext.products
            .Sort(productPrams.OrederBy)
            .Search(productPrams.Searchterm)
            .Filter(productPrams.Types, productPrams.Brands)
            .AsQueryable();
        var products = await  PagedList<Product>.ToPagedList(query,
            productPrams.PageNumber,productPrams.PageSize);
        Response.AddPaginationHeader(products.MetaData);
        return products;
         
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id){
        Product? products=await _storeContext.products.FindAsync(id);
        if (products == null) return BadRequest();
        return Ok(products);
    }
    [HttpGet("Filters")]
    public async Task<IActionResult> GetFilters()
    {
        var Brands = await _storeContext.products.Select(p => p.Brand).Distinct().ToListAsync();
        var Types = await _storeContext.products.Select(p => p.Type).Distinct().ToListAsync();
        return Ok(new { Brands, Types });
}
}