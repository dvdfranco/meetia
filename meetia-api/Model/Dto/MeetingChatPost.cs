using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations.Schema;

namespace MeetiApi.Model
{
    [Serializable]
    public class MeetingChatPost
    {
        public string MeetingId { get; set; }
        public string Sender { get; set; }
        public string Message {get;set;}

        public MeetingChat Convert()
        {
            return new MeetingChat()
            {
                MeetingId = this.MeetingId,
                Sender = this.Sender,
                Message = this.Message
            };
        }
    }
}
