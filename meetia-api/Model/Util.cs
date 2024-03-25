using MongoDB.Bson;

namespace Meetiapi.Models
{
    public class Util
    {
        public static string NewObjectId()
        {
            return new ObjectId(System.Guid.NewGuid().ToString().Replace("-", "")).ToString();
        }

        public static string NewObjectId(string value)
        {
            return new ObjectId(value.Replace("-", "")).ToString();
        }
    }
}
