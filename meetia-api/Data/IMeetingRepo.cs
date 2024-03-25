using MeetiApi.Model;

namespace MeetiapiApi.Data
{
    public interface IMeetingRepo
    {
        Task<IEnumerable<Meeting>> Search();
        Task<Meeting> Single(string id);
        Task<List<Meeting>> All();
        Task<string> Add(Meeting item);
        Task<string> Update(Meeting entity);
    }
}
