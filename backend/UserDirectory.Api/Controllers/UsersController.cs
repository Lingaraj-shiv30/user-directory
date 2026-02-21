using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserDirectory.Api.Data;
using UserDirectory.Api.Dtos;
using UserDirectory.Api.Models;

namespace UserDirectory.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _db;

    public UsersController(AppDbContext db)
    {
        _db = db;
    }

    // GET /api/users
    [HttpGet]
    public async Task<ActionResult<List<User>>> GetAll()
    {
        var users = await _db.Users.AsNoTracking().OrderByDescending(u => u.Id).ToListAsync();
        return Ok(users);
    }

    // GET /api/users/{id}
    [HttpGet("{id:int}")]
    public async Task<ActionResult<User>> GetById(int id)
    {
        var user = await _db.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == id);
        if (user == null) return NotFound();
        return Ok(user);
    }

    // POST /api/users
    [HttpPost]
    public async Task<ActionResult<User>> Create([FromBody] CreateUserDto dto)
    {
        if (!ModelState.IsValid) return ValidationProblem(ModelState);

        var user = new User
        {
            Name = dto.Name.Trim(),
            Age = dto.Age,
            City = dto.City.Trim(),
            State = dto.State.Trim(),
            Pincode = dto.Pincode.Trim()
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = user.Id }, user);
    }

    // PUT /api/users/{id}
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateUserDto dto)
    {
        if (!ModelState.IsValid) return ValidationProblem(ModelState);

        var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == id);
        if (user == null) return NotFound();

        user.Name = dto.Name.Trim();
        user.Age = dto.Age;
        user.City = dto.City.Trim();
        user.State = dto.State.Trim();
        user.Pincode = dto.Pincode.Trim();

        await _db.SaveChangesAsync();
        return NoContent();
    }

    // DELETE /api/users/{id}
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == id);
        if (user == null) return NotFound();

        _db.Users.Remove(user);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}