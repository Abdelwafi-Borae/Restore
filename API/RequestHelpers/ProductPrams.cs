namespace API.RequestHelpers
{
    public class ProductPrams:PaginationParams
    {
        
            public string? OrederBy { get; set; }
            public string? Searchterm { get; set; }
            public string? Types { get; set; }
            public string? Brands { get; set; }
    }
}
