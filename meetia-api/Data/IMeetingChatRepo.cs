using MeetiApi.Model;

namespace MeetiapiApi.Data
{
    public interface IMeetingChatRepo
    {
        Task<List<MeetingChat>> All(string meetingId);
        Task Add(MeetingChat item);
    }
}
