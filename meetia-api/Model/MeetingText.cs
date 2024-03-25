using System.ComponentModel.DataAnnotations.Schema;

namespace MeetiApi.Model
{
    [Serializable]
    public class MeetingText
    {
        public string Speaker { get; set; }

        public string Text { get; set; }
 
        [Column(TypeName = "decimal(5,2)")]
        public decimal Start { get; set; }
    }
}
