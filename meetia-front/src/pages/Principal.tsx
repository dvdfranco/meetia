import { FileUpload, FileUploadHandlerEvent } from 'primereact/fileupload';
import React, { useEffect, useState } from 'react'
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Message as RMessage } from 'primereact/message';
import { Divider } from 'primereact/divider';
import Input from '../components/form/Input';
import { FormProvider, useForm } from 'react-hook-form';
import GladiaTranscriptService from '../services/GladiaTranscriptService';
import { Button } from 'primereact/button';
import ChatGPT from '../components/ChatGPT';
import { ChatContainer, Message, MessageList, MessageModel } from '@chatscope/chat-ui-kit-react';
import { addSeconds, format, set } from 'date-fns';
import 'primeflex/primeflex.css';
import 'primeflex/themes/primeone-dark.css';
import MeetingList from '../components/form/MeetingList';
import MeetiaService from '../services/MeetiaService';
import { Meeting, MeetingFala } from '../interfaces/Meeting';
import 'primeicons/primeicons.css';
import { DePara } from '../components/DePara';

const Principal:React.FC = () => {
    
    const methods = useForm<Meeting>({ defaultValues: { 
        title: '', 
        keywords: '', 
        fileName: '', 
        transcriptUrl: 'https://api.gladia.io/v2/transcription/',
        chatMessages: [], 
        text: [ ], 
        deparaList: '',
        date: new Date(),
        id: '',
        prompt: '',
        speakers: '',
        transcriptId: '',
        utilDepara: ''
     } });
    const { control, setValue, getValues, reset, watch } = methods;
    const [fileName, setfileName] = useState('');
    const [transcriptUrl, setTranscriptUrl] = useState('');
    const [meetings, setMeetings] = useState<any[]>([]);
    const [status, setStatus] = useState('');
    const [meetingText, setMeetingText] = useState<MeetingFala[]>([]);
    const [chatMessages, setChatMessages] = useState<MessageModel[]>([]);
    const [startChatIndicator, setstartChatIndicator] = useState(false);
    const [uploading, setuploading] = useState(false);
    const [uploadError, setuploadError] = useState('');
    const [showUrl, setShowUrl] = useState(false);
    const [chatActiveIndex, setChatActiveIndex] = useState(-1);
    
    useEffect(() => {
        // setfileName(getValues().fileName ?? "");
        // setTranscriptUrl(getValues().transcriptUrl ?? "");

        MeetiaService.GetAll().then((response:any) => {
            setMeetings(response.data);
        });
    }, []);

    const watchFileName = watch('fileName');
    useEffect(() => {
        setfileName(watchFileName);
    }, [watchFileName]);

    const watchTranscriptUrl = watch('transcriptUrl');
    useEffect(() => {
        setTranscriptUrl(watchTranscriptUrl);
    }, [watchTranscriptUrl]);

    const watchText = watch('text');
    useEffect(() => {
        setMeetingText(watchText);
    }, [watchText]);

    const watchId = watch('id');
    const watchChatMessages = watch('chatMessages');
    useEffect(() => {
        setChatMessages(watchChatMessages);
    }, [watchChatMessages]);


    const uploadFile = async (event:FileUploadHandlerEvent) => {
        // convert file to base64 encoded
        const file: any = event.files[0];
        setuploading(true);
        // const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

        GladiaTranscriptService.UploadFile(blob).then((response:any) => 
        {
            console.log("RES", response.data);
            setValue('fileName', response.data.audio_url);
            setfileName(response.data.audio_url);
            setuploading(false);
        }).catch((error:any) => {
            console.log(error)
            setuploading(false);
            setuploadError(`${error.message}: ${error.response.data.message}`);
        });

        // reader.readAsDataURL(blob);
        // reader.onloadend = function () {
        // const base64data = reader.result;
        // console.log( "uploadded", base64data)
        // };
    }



    const transcript = async () => {
        
        const data = getValues();
        const res = await GladiaTranscriptService.CreateTranscription(data.prompt ?? "", data.keywords ?? "", data.fileName ?? "", data.speakers ?? "");

        setValue('transcriptId', res.data.id);
        setValue('transcriptUrl', res.data.result_url);
          
    }
    const getResult = async () => {
        
        const data = getValues();
        const res = await GladiaTranscriptService.GetTranscriptionResult(data.transcriptUrl ?? "", data.speakers ?? "");

        if (res.status !== "done")
        {
            setStatus("Processando...");
            setTimeout(getResult, 5000);
        }
        else {

            setValue("text", res.texts.map((item: MeetingFala) => {
                const m :MeetingFala = {...item, start: Number(item.start)};
                return m;
                })
            );
            setMeetingText(res.texts);
            setStatus(res.status);

        }
    }

    const getMeeting = (item: Meeting): void =>
    {
        reset(item);

        MeetiaService.GetChat(item.id).then((response: any) => {
            setChatMessages(response.data.map((chat: any) => {
                return {
                    sender: chat.sender,
                    message: chat.message,
                    direction: chat.sender == "assistant" ? 'incoming' : 'outgoing',
                    position: 'single'
                };
            }));
        });
    }

    const saveMeeting = async(): Promise<any> => {
        const meet = getValues();
        console.log(meet)
        const meetId = await MeetiaService.UpdateMeeting(meet);
        setValue("id", meetId);

        if (!meetings.some((x:Meeting) => x.id === meetId))
            setMeetings([...meetings, { ...meet, id: meetId }]);
    }

    return (
            <FormProvider {...methods}>
                <div className="grid">
                    <div className="col-2">
                        <MeetingList items={meetings} getMeeting={getMeeting} />
                    </div>
                    <div className="col-10">
                        <form>
                            <Accordion activeIndex={0}>
                                <AccordionTab header="Dados da Reunião">
                                    <>
                                    <div className="formgrid grid" >
                                        <div className="col">
                                            <Input id="title" name="title" label="Titulo" control={control} />
                                        </div>
                                        <div className="col">
                                            <Input id="prompt" name="prompt" label="Contexto" control={control} />
                                        </div>
                                        <div className="col">
                                            <Input id="keywords" name="keywords" label="Palavras-chave" control={control} />
                                        </div>
                                            <div className="col">
                                            <Input id="speakers" name="speakers" label="Nome dos Participantes (1,2...)" control={control} />
                                        </div>
                                        <div className="col-12">
                                            <div className="field">
                                                <label htmlFor="file">Arquivo:</label>
                                                <FileUpload name="file" mode="basic" url="/" customUpload uploadHandler={uploadFile}  />
                                                {uploading && <RMessage severity="info" text="Uploading..." />}
                                                {uploadError && <RMessage severity="error" text={uploadError} />}
                                            </div>
                                        </div>
                                    </div>

                                    <Button severity='secondary' label="UrL Manual" type="button" onClick={()=> { setShowUrl(!showUrl); /* if (!showUrl) resetField('transcriptUrl'); */ }} />

                                    {showUrl &&
                                    <div className="grid">
                                        <div className="col-12 align-items-left border-round">
                                            <Input id="fileName" horizontal name="fileName" label="File URL" control={control} style={{width:'500px'}} />
                                            <Input id="transcriptUrl" horizontal name="transcriptUrl" label="Transcript URL" control={control} onKeyUp={(e) => setTranscriptUrl(e.currentTarget.value) } style={{width:'500px'}} />
                                        </div>
                                    </div>}</>
                                </AccordionTab>
                            </Accordion>



                            <div className="grid col-4">
                                <div className="col">
                                    <Button severity='secondary' label="Transcrever Arquivo" type="button" disabled={fileName==='' || (transcriptUrl !== '' && transcriptUrl !== 'https://api.gladia.io/v2/transcription/')} onClick={transcript} />
                                </div>
                                <div className="col">
                                    <Button severity='secondary' label="Abrir transcrição" type="button" disabled={transcriptUrl === ''} onClick={getResult} />
                                </div>
                                <div className="col">
                                </div>
                            </div>

                            <Accordion activeIndex={-1} className='col-7'>
                                <AccordionTab header="Substituir termos no texto">
                                    <DePara meetingText={meetingText} setMeetingText={setMeetingText} />
                                </AccordionTab>
                            </Accordion>

                            <Divider />
                            <div className="grid col-4">
                                <div className="col">
                                    <Button label="Salvar Meeting" type='button' onClick={saveMeeting}/>
                                </div>
                                <div className="col">
                                    <Button label="Iniciar ChatGPT" type='button' onClick={() => { setstartChatIndicator(true); setChatActiveIndex(0); }} disabled={
                                        (meetingText?.length === 0) || (watchId === undefined || watchId === '')
                                        //{(((chatMessages?.length ?? 0) > 0) || (watchId ?? '' ===''))}
                                    } />
                                </div>
                            </div>
                            <Divider />

                        </form>


                        <Accordion activeIndex={-1} className='col-7'>
                            <AccordionTab header={`Resultado: ${status}`}>
                                <div style={{height: '600px', overflow: 'auto', padding: '10px'}}>
                                    <ChatContainer>
                                        <MessageList scrollBehavior='smooth'>
                                            {meetingText?.map((item, index) => (
                                                <Message key={index} model={{ sender: item.speaker, message: item.text, direction:  index % 2 == 0 ? 'incoming' : 'outgoing', position: 'single' }}>
                                                    <Message.Header>
                                                        {item.speaker} ({format(addSeconds(new Date(2001,1,1,0,0,0), item.start), 'mm:ss')})
                                                    </Message.Header>
                                                </Message>
                                        ))}
                                        </MessageList>
                                    </ChatContainer>
                                </div>
                            </AccordionTab>
                        </Accordion>

                        <Divider />

                        <Accordion activeIndex={chatActiveIndex} className='col-7' onTabChange={(e) => setChatActiveIndex(Number(e.index))}>
                            <AccordionTab header={`ChatGPT`}>
                                <div style={{height: '600px', overflow: 'auto', padding: '10px'}}>
                                    <ChatGPT messages={chatMessages} startFirstChat={startChatIndicator} />
                                </div>
                            </AccordionTab>
                        </Accordion>
                        
                    </div>
                </div>  
            </FormProvider>
    );
}

export default Principal;