# MEET-IA by @dvdfranco

Esta aplicação recebe um arquivo de uma reunião gravada, utiliza serviços de IA para transcrever o áudio e resumir as minutas da reunião com o ChatGPT, permitindo que você possa conversar sobre a reunão com o ChatGPT, além do resumo.

- Para transcrever o áudio, utiliza o serviço Gladia (https://gladia.io)
- Para conversar com o ChatGPT, utiliza os serviços da Azure OpenAI (https://azure.microsoft.com/pt-br/products/ai-services/openai-service)
- Para armazenar as conversas e etc, utiliza um banco MongoDB mal-desenhado

Como eu gosto do Guia do Mochileiro das Galáxias, a conversa com o ChatGPT seguirá a personalidade do Marvin, o Andróide Paranóide, para que a conversa tenha um pouco de humor.

## Mas que zona é essa?

Olha, eu nunca subi um projeto no Git antes, e pra piorar, esse projeto iniciou como um utilitário pessoal, com código desleixado, mal documentado e todo problemático... \
\
Então, eu prometo documentar ou melhorar o código assim que possível! Não, mentira, eu não prometo nada, porque meu TDAH provavelmente vai fazer eu perder o foco neste app assim que eu me interessar por uma bobeira nova. \
Ainda assim, eu gostaria de fazer isso, então se você gostou dessa aplicação e está completamente perdido, me avise para que eu seja pressionado a manter/melhorar esse repositório!

## Putz, sério?

Sério, mas basicamente é o seguinte:

- Necessário criar um DB MongoDB na sua máquina, um db chamado "meetia", e com as coleções "meeting" e "meetingChat" (TODO: descobrir se tem como exportar um script do banco para facilitar a vida das pessoas aqui)
- Necessário criar uma API KEY na Gladia, para usar os serviços de áudio
- Necessário criar uma API KEY na Azure, para usar os serviços do ChatGPT

O código inclui 2 itens:

### API Meetia

Esta é uma API simples em C#, que serve para armazenar as meetings salvas, e o texto das conversas com o ChatGPT. \
É necessário que a API esteja rodando quando usar a aplicação front, então se você rodar a API direto do Visual Studio, ou armazenar num servidor IIS, não esqueça de incluir essa informação no arquivo .env da aplicação React (`VITE_REACT_APP_MEETIA_API_URL`)\
Também é necessário prestar atenção nas configurações da Api, em especial o arquivo Program.cs, que tem configurações de CORS que devem ser revistas caso você utilize ou exponha esta API por aí. Segurança, sabe?

### Frontend React

Esta é a aplicação.. do Frontend... escrito em React (duh). \
Escrita utilizando as bibliotecas VITE, PRIMEREACT e CHATSCOPE. \
Antes de usar, não esqueça de configurar o arquivo .env, com as suas API KEYs da Gladia e Azure, etc. \
Depois, utilizar os comandos:
- npm install
- npm start

...Não roda tudo no Docker? Foi mal, eu nunca soube direito como configurar/disponibilizar uma imagem pra facilitar a sua vida. Prometo que se aprender, eu atualizo esse repo. Ou não.

## Resumindo tudo

1. Baixe este repositório
1. Crie um usuário e chave no serviço Gladia
1. Crie um usuário e chave no serviço Azure OpenAI
1. Instale o MongoDB na sua máquina, e crie o banco e as coleções iniciais
1. Rode a api MeetiApi no Visual Studio ou onde preferir
1. Abra a solução meetia-front
1. Revise as configurações no arquivo .env
1. Abra o terminal no diretório meetia-front
1. Rode:
  - npm install
  - npm run 

## Utilizando o sistema:

1. Preencha os campos (TODO: completar como usar o sistema, aqui)
