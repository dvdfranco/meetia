using MeetiApi.Model;

namespace MeetiApi.Services
{
    public interface IMeetingService
    {
        Task<string> Add(Meeting item);

        Task<string> Update(Meeting item);

        Task<Meeting> Get(string id);
        Task<List<Meeting>> All();
        Task<List<MeetingChat>> AllChats(string meetingId);
        Task AddChat(MeetingChat item);
    }
}
