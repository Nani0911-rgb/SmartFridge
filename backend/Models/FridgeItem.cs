namespace SmartFridge.Api.Models;

public class FridgeItem
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public double Quantity { get; set; }
    public string Unit { get; set; } = "g";
    public DateOnly ExpirationDate { get; set; }
    public double CaloriesPer100 { get; set; }
}