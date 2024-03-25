namespace MeetiApi.Model
{
    [Serializable]
    public class MeetingPost
    {
        public string? Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Prompt { get; set; }
        public string Keywords {get;set;}
        public string Speakers {get;set;}
        public string TranscriptUrl {get;set;}
        public string FileName {get;set;}
        public string? DeparaList { get; set; }
        public MeetingText[] Text { get;set;}

        public Meeting Convert()
        {
            return new Meeting()
            {
                Id = this.Id,
                Title = this.Title,
                Date = this.Date,
                Prompt = this.Prompt,
                Keywords = this.Keywords,
                Speakers = this.Speakers,
                TranscriptUrl = this.TranscriptUrl,
                FileName = this.FileName,
                DeparaList = this.DeparaList,
                Text = this.Text
            };
        }
    }
}
