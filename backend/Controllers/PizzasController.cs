using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PizzaApi.Models;

namespace PizzaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PizzasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PizzasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Pizzas (Отримати всі піци)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pizza>>> GetPizzas()
        {
            return await _context.Pizzas.ToListAsync();
        }

        // --- ЦЕЙ МЕТОД МИ ДОДАЛИ ---
        // GET: api/Pizzas/5 (Отримати конкретну піцу за ID)
        [HttpGet("{id}")]
        public async Task<ActionResult<Pizza>> GetPizza(int id)
        {
            var pizza = await _context.Pizzas.FindAsync(id);

            if (pizza == null)
            {
                return NotFound(new { message = $"Піцу з ID {id} не знайдено." });
            }

            return Ok(pizza);
        }
        // ---------------------------------

        // POST: api/Pizzas (Додати нову піцу)
        [HttpPost]
        public async Task<ActionResult<Pizza>> PostPizza(Pizza pizza)
        {
            if (pizza.Id == 0)
            {
                pizza.Id = 0;
            }

            _context.Pizzas.Add(pizza);
            await _context.SaveChangesAsync();

            return StatusCode(201, pizza);
        }

        // DELETE: api/Pizzas/5 (Видалити конкретну піцу за ID)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePizza(int id)
        {
            var pizza = await _context.Pizzas.FindAsync(id);
            if (pizza == null)
            {
                return NotFound();
            }

            _context.Pizzas.Remove(pizza);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/Pizzas/5 (Редагувати піцу)
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPizza(int id, Pizza pizza)
        {
            if (id != pizza.Id)
            {
                BadRequest();
            }

            _context.Entry(pizza).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Pizzas.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(pizza);
        }
    }
}