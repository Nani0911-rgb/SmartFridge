namespace SmartFridge.Api.Services;

public static class UnitConverter
{
    public static double ToBaseUnit(double quantity, string unit)
    {
        return unit.Trim().ToLower() switch
        {
            "kg" => quantity * 1000,
            "dkg" => quantity * 10,
            "g" => quantity,
            "l" => quantity * 1000,
            "dl" => quantity * 100,
            "cl" => quantity * 10,
            "ml" => quantity,
            "db" => quantity,
            _ => throw new ArgumentException($"Ismeretlen mértékegység: {unit}")
        };
    }
}