import axios from 'axios';

export default class GladiaTranscriptService
{
    static readonly BASE_URL : string = "https://api.gladia.io/";
    static readonly API_KEY : string = import.meta.env.VITE_REACT_APP_GLADIA_API_KEY;

    static readonly api = axios.create({
        baseURL: this.BASE_URL,
        responseType: `json`,
    });

    static async UploadFile(blob: any) {
        const form = new FormData();
        form.append("audio", blob);

        const response = await this.api.post('/v2/upload', form, { headers: { 'x-gladia-key': `${this.API_KEY}` } });
        return response;
    }


    static async CreateTranscription(prompt: string, keywords: string, audioUrl: string, speakers: string) {
       const body = 
        {
            "custom_vocabulary": keywords.split(','),
            "summarization": true,
            "context_prompt": prompt,
            "detect_language": false,
            "language": "pt",
            "subtitles": false,
            "diarization": true,
            "diarization_config": {
                "number_of_speakers": Number(speakers.split(',').length)
                // "min_speakers": 1,
                // "max_speakers": Number(speakers.split(',').length)
            },
            "audio_url": audioUrl
        };

        const response = await this.api.post('/v2/transcription', body, { headers: { 'x-gladia-key': `${this.API_KEY}` } });
        
        return response;
    }

    static async GetTranscriptionResult(url: string, speakers: string): Promise<{ status: string, texts: any[] }> {
        const response = await this.api.get(url, { headers: { 'x-gladia-key': `${this.API_KEY}` } });
        
        const frases:any[] = [];
        const arrSpeakers = [ ...speakers.split(','), 'Desconhecido 0', 'Desconhecido 1', 'Desconhecido 2', 'Desconhecido 3', 'Desconhecido 4', 'Desconhecido 5', 'Desconhecido 6'].filter(x => x !== '');

        if (response.data.status === "done")
        {
            let speaker = -1;
            let currentLine = "";
            let start = 0;

            //Como as falas vem num array, as vezes com posicoes seguidas do mesmo speaker, vou juntar tudo separando por speaker:
            response.data.result.transcription.utterances.forEach((fala:any, index:number) => {
                if (speaker !== fala.speaker || index === response.data.result.transcription.utterances.length - 1)
                {
                    if (currentLine !== "")
                    {
                        frases.push({
                            start: start.toFixed(2),
                            text: currentLine,
                            speaker: arrSpeakers[speaker]
                        });
                    }

                    start = fala.start;
                    currentLine = fala.text;

                }
                else
                currentLine += " " + fala.text;

                // console.log("fala", fala.speaker, arrSpeakers[fala.speaker], fala.text, fala.start, start.toFixed(2));
                // console.log("fala", currentLine);

                speaker = fala.speaker;
            });

            //sobrou um raspinho:
            if (currentLine !== "")
                if (arrSpeakers[speaker] !== frases[frases.length-1].speaker && currentLine !== frases[frases.length-1].text)
                {
                    frases.push({
                        start: start.toFixed(2),
                        text: currentLine,
                        speaker: arrSpeakers[speaker]
                    });
                } 
                else if (currentLine !== frases[frases.length-1].text)
                {
                    frases[frases.length-1].text += " " + currentLine;
                }
        }
        
        return {
            status: response.data.status,
            texts: frases
        };
    }
}