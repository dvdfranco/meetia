using MeetiApi.Model;
using MeetiApi.Services;

namespace MeetiapiApi.Services
{
    public class MeetingService : IMeetingService
    {
        private readonly Data.IMeetingRepo _repo;
        private readonly Data.IMeetingChatRepo _chatRepo;

        public MeetingService(Data.IMeetingRepo repo, Data.IMeetingChatRepo chatRepo)
        {
            this._repo = repo;
            _chatRepo = chatRepo;
        }

        //public async Task<IEnumerable<Meeting>> Search(SaldoParameters parameters)
        //{
        //    return await _repo.Search(parameters);
        //}

        public async Task<string> Add(Meeting item)
        {
            return await _repo.Add(item);
        }

        public async Task<string> Update(Meeting item)
        {
            return await _repo.Update(item);
        }

        public async Task<Meeting> Get(string id)
        {
            return await _repo.Single(id);
        }

        public async Task<List<Meeting>> All()
        {
            return await _repo.All();
        }

        public async Task<List<MeetingChat>> AllChats(string meetingId)
        {
            return await _chatRepo.All(meetingId);
        }

        public async Task AddChat(MeetingChat item)
        {
            await _chatRepo.Add(item);
        }
    }
}
