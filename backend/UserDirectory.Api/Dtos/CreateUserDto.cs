using System.ComponentModel.DataAnnotations;

namespace UserDirectory.Api.Dtos;

public class CreateUserDto
{
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Name { get; set; } = "";

    [Required]
    [Range(0, 120)]
    public int Age { get; set; }

    [Required]
    public string City { get; set; } = "";

    [Required]
    public string State { get; set; } = "";

    [Required]
    [StringLength(10, MinimumLength = 4)]
    public string Pincode { get; set; } = "";
}