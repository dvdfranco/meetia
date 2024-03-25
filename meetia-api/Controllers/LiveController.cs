using Microsoft.AspNetCore.Mvc;

namespace MeetiapiApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LiveController : ControllerBase
    {
        public LiveController()
        {
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok("works!");
        }

    }
}
