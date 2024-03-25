using Meetiapi.Models;
using MeetiApi.Model;
using MongoDB.Driver;

namespace MeetiapiApi.Data
{
    public class MeetingRepo : IMeetingRepo
    {
        private readonly MongoClient _client;
        private readonly IMongoCollection<Meeting> _context;

        public MeetingRepo(AppSettings appSettings)
        {
            _client = new MongoClient(appSettings.MongoUrl);
            _context = _client.GetDatabase("meetia").GetCollection<Meeting>("meeting");
        }

        public async Task<IEnumerable<Meeting>> Search()
        {
            var query = _context.AsQueryable<Meeting>();
            return await query.ToListAsync();
        }

        public async Task<List<Meeting>> All()
        {
            return (await _context.FindAsync(x => true)).ToList();
        }

        public async Task<string> Add(Meeting item)
        {
            await _context.InsertOneAsync(item);
            return item.Id;
        }

        public async Task<string> Update(Meeting item)
        {
            await _context.ReplaceOneAsync(x => x.Id == item.Id, item);
            return item.Id;
        }

        public async Task<Meeting> Single(string id)
        {
            return (await _context.FindAsync(x => x.Id == id)).SingleOrDefault();
        }
    }
}
