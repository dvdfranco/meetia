import React, { useEffect, useState } from 'react';
import { ChatContainer, MessageList, Message, MessageInput, MessageSeparator, TypingIndicator, MessageModel } from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { ChatRequestMessage } from '@azure/openai';
import ChatGPTService from '../services/ChatGPTService';
import { useFormContext } from 'react-hook-form';
import { addSeconds, format } from 'date-fns';
import { MeetingFala } from '../interfaces/Meeting';
import MeetiaService from '../services/MeetiaService';
import Markdown from 'react-markdown';


interface ChatProps {
  messages: MessageModel[];
  startFirstChat: boolean;
}

const ChatGPT: React.FC<ChatProps> = ({messages, startFirstChat}) => {
    const methods = useFormContext();
    const { setValue, getValues } = methods;

    const [isTyping, setisTyping] = useState(false);

        
    const sendMessage = async (message: string): Promise<void> => {
        messages.push({ sender: "user", message: message, direction: 'outgoing', position: 'single' });
        const arrMessages = messages.map((msg) => { const msgItem: ChatRequestMessage = { role: msg.sender === "user" ? "user" : "system", content: msg.message ?? "" }; return msgItem; });

        const sendMessages: ChatRequestMessage[] = [
          { role: "system", content: ChatGPTService.SYSTEM_MESSAGE },
          ...arrMessages,
        ];

        setValue('chatMessages', [...messages]);

        setisTyping(true);
        
        if (messages.length == 1)
          await MeetiaService.AddChat(getValues().id, messages[0]); //Gravar a 1a pergunta feita ever
        else
          await MeetiaService.AddChat(getValues().id, messages[messages.length-1]); //Gravar a ultima pergunta

        const response = await ChatGPTService.SendMessage(sendMessages);

        messages.push({ sender: "assistant", message: response, direction: 'incoming', position: 'single' });
        setValue('chatMessages', [...messages]);        
        setisTyping(false);

        await MeetiaService.AddChat(getValues().id, messages[messages.length-1]); //Gravar a resposta
      }

      useEffect(() => {
        if (startFirstChat === true && messages.length === 0)
        {
        const meetData = getValues();
        const meetingText = ChatGPTService.INITIAL_MESSAGE
          .replace("{0}", meetData.prompt)
          .replace("{1}", meetData.text.map((x:MeetingFala) => FalaFormatted(x)).join("\n\n"));
        sendMessage(meetingText);
        }
      }, [startFirstChat]);
      
      const FalaFormatted = (fala: MeetingFala) => {
        return `${fala.speaker} (${format(addSeconds(new Date(2001,1,1,0,0,0), fala.start), 'mm:ss')}):\n${fala.text}`;
      }

  

    return (
        <ChatContainer>
            <MessageList scrollBehavior='smooth' typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}>
                <MessageSeparator content='Today' />

                {messages?.map((msg, index) => {
                  //Resumir o longo texto da 1a mensagem, para exibir na tela:
                  let formattedMessage = msg.message;

                  if (index === 0 && (msg.message??"").indexOf("\n") > 0)
                  formattedMessage = "..." + msg.message?.substring(msg.message?.lastIndexOf("\n")+1);

                  return (
                    <Message key={index} model={{...msg, type: "custom"}}>
                      <Message.CustomContent>
                        <Markdown>{formattedMessage}</Markdown>
                      </Message.CustomContent>
                    </Message>
                  );
                })}
            </MessageList>

            <MessageInput title='text' attachButton={false} placeholder='Type your message...' onSend={sendMessage} />
        </ChatContainer>
    );
};

export default ChatGPT;