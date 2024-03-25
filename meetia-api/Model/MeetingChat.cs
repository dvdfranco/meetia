using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MeetiApi.Model
{
    [Serializable]
    public class MeetingChat
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string MeetingId { get; set; }

        public string Sender { get; set; }
        public string Message {get;set;}
    }
}
