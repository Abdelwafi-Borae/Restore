using Microsoft.AspNetCore.Razor.TagHelpers;
using Microsoft.EntityFrameworkCore;

namespace API.RequestHelpers
{
    public class PagedList<T>:List<T>
    {
      public  MetaData MetaData;

        public PagedList(List<T> item,int count ,int pagenumber,int pagesize)
        {
            MetaData = new MetaData
            {
                PageSize = pagesize,
                CurrentPage = pagenumber,
                TotalCount = count,
                TotalPages = (int)Math.Ceiling(count / (double)pagesize)
            };
            AddRange(item);
        }

        public static async Task<PagedList<T>> ToPagedList(IQueryable<T> query,int pagenumber,int pagesize)
        {
            var count=await query.CountAsync();
            var items = await query.Skip((pagenumber - 1) * pagesize).Take(pagesize).ToListAsync();
            return new PagedList<T>(items, count, pagenumber, pagesize);
        }
    }
}
