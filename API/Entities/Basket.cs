namespace API.Entities;

public class Basket
{
    public int Id { get; set; }
    public string BuyerId { get; set; }
    public List<BasketItem> Items { get; set; } = new();









    public void AddItem(Product product,int quantity)
    {
        //in case item not exist so we add new item to the list
        if(Items.All(items => items.ProductId != product.Id))
        { 
            Items.Add(new BasketItem { Product=product,Quantity=quantity});
        }
        var existingitem=Items.FirstOrDefault(item => item.ProductId == product.Id);
        if(existingitem != null)existingitem.Quantity+=quantity;//update the quantity of existing item in the basketlist
    }
    public void RemoveItem(int ProductId,int quantity)
    {
        var item=Items.FirstOrDefault(item => item.ProductId == ProductId);
        if (item == null) return; 
        item.Quantity-=quantity;
        if (item.Quantity == 0) { Items.Remove(item); }
    }
}
