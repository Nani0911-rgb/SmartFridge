using Microsoft.AspNetCore.Mvc;
using SmartFridge.Api.Models;
using SmartFridge.Api.Services;

namespace SmartFridge.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FridgeController : ControllerBase
{
    [HttpGet]
    public IActionResult GetItems()
    {
        var items = new List<FridgeItem>
        {
            new FridgeItem { Id = 1, Name = "Tej", Quantity = 1, Unit = "l" },
            new FridgeItem { Id = 2, Name = "Csirkemell", Quantity = 500, Unit = "g" }
        };

        return Ok(items);
    }
    [HttpGet("convert")]
    public IActionResult Convert(double quantity, string unit)
    {
        var converted = UnitConverter.ToBaseUnit(quantity, unit);
        return Ok(new { quantity, unit, converted });
    }
}