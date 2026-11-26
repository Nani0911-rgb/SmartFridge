using Microsoft.AspNetCore.Mvc;
using SmartFridge.Api.Models;
using SmartFridge.Api.Services;

namespace SmartFridge.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FridgeController : ControllerBase
{
    private static readonly List<FridgeItem> _items =
    [
        new FridgeItem { Id = 1, Name = "Tej", Quantity = 1, Unit = "l" },
        new FridgeItem { Id = 2, Name = "Csirkemell", Quantity = 500, Unit = "g" }
    ];

    [HttpGet]
    public IActionResult GetItems()
    {
        return Ok(_items);
    }

    [HttpGet("convert")]
    public IActionResult Convert(double quantity, string unit)
    {
        var converted = UnitConverter.ToBaseUnit(quantity, unit);
        return Ok(new { quantity, unit, converted });
    }

    [HttpPost]
    public IActionResult AddItem([FromBody] FridgeItem newItem)
    {
        newItem.Id = _items.Count > 0 ? _items.Max(x => x.Id) + 1 : 1;
        _items.Add(newItem);

        return Ok(newItem);
    }
    [HttpPut("{id}")]
    public IActionResult UpdateItem(int id, [FromBody] FridgeItem updatedItem)
    {
        var existing = _items.FirstOrDefault(x => x.Id == id);
        if (existing is null)
        {
            return NotFound();
        }

        existing.Name = updatedItem.Name;
        existing.Quantity = updatedItem.Quantity;
        existing.Unit = updatedItem.Unit;
        existing.ExpirationDate = updatedItem.ExpirationDate;
        existing.CaloriesPer100 = updatedItem.CaloriesPer100;

        return Ok(existing);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteItem(int id)
    {
        var existing = _items.FirstOrDefault(x => x.Id == id);
        if (existing is null)
        {
            return NotFound();
        }

        _items.Remove(existing);
        return NoContent();
    }
}