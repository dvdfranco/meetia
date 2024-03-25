using Meetiapi.Models;
using MeetiApi.Model;
using MongoDB.Driver;

namespace MeetiapiApi.Data
{
    public class MeetingChatRepo : IMeetingChatRepo
    {
        private readonly MongoClient _client;
        private readonly IMongoCollection<MeetingChat> _context;

        public MeetingChatRepo(AppSettings appSettings)
        {
            _client = new MongoClient(appSettings.MongoUrl);
            _context = _client.GetDatabase("meetia").GetCollection<MeetingChat>("meetingChat");
        }

        public async Task Add(MeetingChat item)
        {
            await _context.InsertOneAsync(item);
        }

        public async Task<List<MeetingChat>> All(string meetingId)
        {
            return (await _context.FindAsync(x => x.MeetingId == meetingId)).ToList();
        }
    }
}
