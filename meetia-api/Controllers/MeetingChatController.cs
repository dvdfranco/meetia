using MeetiApi.Model;
using MeetiApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace MeetiapiApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MeetingChatController : ControllerBase
    {
        private readonly IMeetingService _service;

        public MeetingChatController(IMeetingService service)
        {
            _service = service;
        }

        [HttpGet("{meetingId}")]
        public async Task<List<MeetingChat>> Get(string meetingId)
        {
            return await _service.AllChats(meetingId);
        }

        [HttpPost]
        public async Task<IActionResult> Post(MeetingChatPost item)
        {
            await _service.AddChat(item.Convert());
            return Ok();
        }

    }
}
