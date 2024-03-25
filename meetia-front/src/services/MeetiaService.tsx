import axios from 'axios';
import { Meeting } from '../interfaces/Meeting';
import { MessageModel } from '@chatscope/chat-ui-kit-react';

export default class MeetiaService
{
    static readonly BASE_URL : string = import.meta.env.VITE_REACT_APP_MEETIA_API_URL;
    static readonly api = axios.create({
        baseURL: this.BASE_URL,
        responseType: `json`
    });


    static async GetAll() {
         const response = await this.api.get('meeting/all');
         return response;
     }

     static async GetChat(meetingId: string) {  
          const response = await this.api.get('meetingchat/' + meetingId);
          return response;
      }

     static async AddChat(meetingId: string, message: MessageModel) {
          const response = await this.api.post('meetingchat', { meetingId: meetingId, ...message });
          return response;
      }

     static async UpdateMeeting(meet: Meeting) : Promise<string> {
          const response = await this.api.put('meeting', meet);
          return String(response.data);
      }
}