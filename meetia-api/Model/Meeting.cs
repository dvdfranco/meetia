using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations.Schema;

namespace MeetiApi.Model
{
    [Serializable]
    public class Meeting
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [Column("title")]
        public string Title { get; set; }

        public DateTime Date { get; set; }
        public string Prompt { get; set; }
        public string Keywords {get;set;}
        public string Speakers {get;set;}
        public string TranscriptUrl {get;set;}
        public string FileName {get;set;}
        public string DeparaList { get; set; }
        public MeetingText[] Text { get;set;}
    }
}
