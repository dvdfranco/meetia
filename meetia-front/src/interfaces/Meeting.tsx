import { MessageModel } from "@chatscope/chat-ui-kit-react";

export interface Meeting {
    date: Date;
    deparaList: string;
    fileName: string;
    id: string;
    keywords: string;
    prompt: string;
    speakers: string;
    text: MeetingFala[];
    title: string;
    transcriptId: string;
    transcriptUrl: string;
    chatMessages: MessageModel[];

    utilDepara?: string;
}

export interface MeetingFala {
    speaker: string;
    text: string;
    start: number;
}