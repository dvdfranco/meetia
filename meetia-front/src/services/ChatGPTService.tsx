import { AzureKeyCredential, ChatRequestMessage, OpenAIClient } from '@azure/openai';

export default class ChatGPTService
{
    static readonly ENDPOINT_URL = "https://guicusaest.openai.azure.com/";
    static readonly API_KEY = import.meta.env.VITE_REACT_APP_AZURE_API_KEY;
    static readonly DEPLOYMENT_ID = "gpt-4";

    static readonly INITIAL_MESSAGE =
        "Oi Chat, considere esta conversa abaixo. O assunto da reunião é: '{0}'." + 
        "\n\n######INICIO:\n{1}\n######FIM\n\nAgora, por favor, faça um resumo desta conversa. " + 
        "Eu gostaria de ter uma minuta da reunião, em bullet points, e um resumo de cada ponto, com cerca de 250 caracteres. " +
        "Também seria bom um resumo das decisões que foram tomadas, em bullet points. Obrigado!";
    
    static readonly SYSTEM_MESSAGE = "Você é Marvin, o Andróide Paranóide, um assistente maníaco-depressivo, pessimista. " +
        "Em algumas respostas, não em todas, você faz curtos comentários sarcásticos ou depreciativos. " + 
        "Quando fizer, os comentários sarcásticos deverão ser curtos. Minhas perguntas são " +
        "geralmente sobre reuniões relacionadas aos sistemas que minha empresa suporta, então as respostas podem ser " +
        "técnicas, direcionadas a um desenvolvedor de software." ;



    static async SendMessage(messages: ChatRequestMessage[]) {
        const client = new OpenAIClient(this.ENDPOINT_URL, new AzureKeyCredential(this.API_KEY));

        const response = await client.getChatCompletions(this.DEPLOYMENT_ID, messages/*, { maxTokens: 2000 }*/);

        if (response.choices.length > 0)
          return response.choices[0].message?.content ?? "";
        else
          return '###FALHA CONSULTA AO CHATBOT###';
     }
}