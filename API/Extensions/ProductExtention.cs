using API.Entities;

namespace API.Extensions;

public static class ProductExtention
{
    public static IQueryable<Product> Sort(this IQueryable<Product> query, string? orderby)
    {
        if (string.IsNullOrWhiteSpace(orderby)) return query.OrderBy(p => p.Name);
        query = orderby switch
        {
            "price" => query.OrderBy(p => p.Price),
            "priceDes" => query.OrderByDescending(p => p.Price),
            _ => query.OrderBy(p => p.Name)

        };
        return query;
    }
    public static IQueryable<Product> Search(this IQueryable<Product> query, string? Searchterm)
    {
        if (string.IsNullOrWhiteSpace(Searchterm)) return query;
        var lowercaseSearchterm = Searchterm.Trim().ToLower();
        return query.Where(p=>p.Name.ToLower().Contains(lowercaseSearchterm));
    } 
    public static IQueryable<Product> Filter(this IQueryable<Product> query, string? type,string? brand)
    {
        var  brandlist = new List<string>();
        var typelist = new List<string>();

        if (!string.IsNullOrWhiteSpace(type))
            typelist.AddRange(type.ToLower().Split(",").ToList());
        
        if (!string.IsNullOrWhiteSpace(brand))
            brandlist.AddRange(brand.ToLower().Split(",").ToList());

        query=query.Where(p=>brandlist.Count==0||brandlist.Contains(p.Brand.ToLower()));
        query=query.Where(p=>typelist.Count==0||typelist.Contains(p.Type.ToLower()));
        var x = query;
        return query;

    }
}

