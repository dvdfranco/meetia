using Meetiapi.Models;
using MeetiApi.Services;
using MeetiapiApi.Data;
using MeetiapiApi.Services;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
    //.AddJsonOptions(options =>
    //{
    //    //para que enviar os models no formato json, nao recuse as propriedades por ser case sensitive:
    //    options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
    //});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


/*cod dvd-*/
var appSettings = new AppSettings();
new ConfigureFromConfigurationOptions<AppSettings>(
    builder.Configuration.GetSection("AppSettings"))
        .Configure(appSettings);

builder.Services.AddSingleton(appSettings); 

builder.Services.AddScoped<IMeetingRepo, MeetingRepo>();
builder.Services.AddScoped<IMeetingChatRepo, MeetingChatRepo>();

builder.Services.AddScoped<IMeetingService, MeetingService>();


//CORS: precisa ter aqui no services e la embaixo no app.usecors:
const string CORS_POLICY = "cors, bitch!";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: CORS_POLICY,
                      policy =>
                      {
                          //TODO: Cuidado! Cors is a bitch, caso expor este código além do seu ambiente de testes, precisa rever estas configs para não expor seus dados! 
                          policy.AllowAnyMethod()
                          .AllowAnyOrigin()
                          .AllowAnyHeader();
                      });
});
/*fim dvd/*/


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

//dvd:
app.UseCors(CORS_POLICY);

app.Run();
