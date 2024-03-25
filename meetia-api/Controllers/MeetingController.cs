using MeetiApi.Model;
using MeetiApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace MeetiapiApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MeetingController : ControllerBase
    {
        private readonly IMeetingService _service;

        public MeetingController(IMeetingService service)
        {
            _service = service;
        }

        [HttpGet("{id}")]
        public async Task<Meeting> Get(string id)
        {
            return await _service.Get(id);
        }

        [HttpGet("all")]
        public async Task<List<Meeting>> All()
        {
            return await _service.All();
        }

        [HttpPut]
        public async Task<IActionResult> Put(MeetingPost item)
        {
            var meeting = item.Convert();
            var response = "";
            if (string.IsNullOrEmpty(meeting.Id))
                response = await _service.Add(meeting);
            else
                response = await _service.Update(item.Convert());
            return Ok(response);
        }
    }
}
