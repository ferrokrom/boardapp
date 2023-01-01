using boardappserver.Extensions;
using boardappserver.Filters;
using boardappserver.Infrastructure;
using boardappserver.Middlerwares;
using Business.Abstract;
using Business.Concrete;
using Business.Mapping;
using DataAccess.Abstract;
using DataAccess.Concrete;
using Entities.Models;
using Infrastucture.Cors;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Microsoft.VisualBasic;
using Swashbuckle.AspNetCore.Filters;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
builder.Services.AddControllers();
builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<ISectionRepository, SectionRepository>();
builder.Services.AddTransient<IBoardRepository, BoardRepository>();
builder.Services.AddTransient<ITodoRepository, TodoRepository>();
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<ISectionService, SectionService>();
builder.Services.AddTransient<ITodoService, TodoService>();
builder.Services.AddTransient<IBoardService, BoardService>();
builder.Services.AddTransient<IBoardUserRepository, BoardUserRepository>();
builder.Services.AddTransient<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped(typeof(ValidationFilterAttribute<>));
builder.Services.AddTransient<ITodoUserService, TodoUserService>();
builder.Services.AddTransient<ITodoUserRepository, TodoUserRepository>();
builder.Services.AddTransient<ICommentRepository, CommentRepository>();
builder.Services.AddTransient<ICommentService, CommentService>();
builder.Services.AddTransient<IMessageRepository, MessageRepository>();
builder.Services.AddTransient<INotificationRepository, NotificationRepository>();
builder.Services.AddTransient<IUserNotificationRepository, UserNotificationRepository>();
builder.Services.AddTransient<IMessageReceiverRepository, MessageReceiverRepository>();

builder.Services.AddCorsPolicy();

builder.Services.AddAutoMapper(typeof(MapProfile));
builder.Services.AddTransient(typeof(IGenericRepository<>), typeof(GenericRepository<>));
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppilicationContext>(options => options.UseSqlServer(connectionString, b => b.MigrationsAssembly("Migrations")));




// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAuthentication(opt =>
{
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options => { 
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true, 
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"))
    };
    });

builder.Services.AddSwaggerGen(options => {
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme {
            Description="Standart Scheme",
            In= ParameterLocation.Header,
            Name="Authorization",
            Type=SecuritySchemeType.ApiKey,

}); options.OperationFilter<SecurityRequirementsOperationFilter>();
});



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors("boardappclient");
app.UserCustomException();

app.UseHttpsRedirection();
app.UseStaticFiles(new StaticFileOptions()
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
    RequestPath = new PathString("/Resources")
});

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
