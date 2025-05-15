using Microsoft.EntityFrameworkCore;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.Services;
using SpeedReaderAPI.Services.Impl;
using SpeedReaderAPI.Filters;
using SpeedReaderAPI;
using Serilog;
using Serilog.Events;
using Elastic.CommonSchema.Serilog;
using Elastic.Serilog.Sinks;
using Elastic.Ingest.Elasticsearch;
using Elastic.Transport;
using Prometheus;
using Microsoft.OpenApi.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using SpeedReaderAPI.Entities;

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Override("Microsoft.AspNetCore.Hosting", LogEventLevel.Warning)
    .MinimumLevel.Override("Microsoft.AspNetCore.Mvc", LogEventLevel.Warning)
    .MinimumLevel.Override("Microsoft.AspNetCore.Routing", LogEventLevel.Warning)
    .CreateLogger();

try
{
    // Build configuration to access appsettings.json
    var configuration = new ConfigurationBuilder()
        .AddJsonFile("appsettings.json")
        .Build();

    var builder = WebApplication.CreateBuilder(args);
    builder.Services.AddHttpContextAccessor();
    builder.Host.UseSerilog((context, services, loggerConfig) =>
    {
        bool useElasticsearch = configuration.GetValue<bool>("UseElasticsearch");
        var elasticsearchUrl = context.Configuration["Elasticsearch:Url"];
        var elasticUsername = context.Configuration["Elasticsearch:Username"];
        var elasticPassword = context.Configuration["Elasticsearch:Password"];

        loggerConfig
            .ReadFrom.Configuration(context.Configuration)
            .ReadFrom.Services(services)
            .MinimumLevel.Debug()
            .Enrich.FromLogContext()
            .WriteTo.File("logs/log.txt", rollingInterval: RollingInterval.Day)
            .WriteTo.Async(a => a.Console(new EcsTextFormatter()));

        if (useElasticsearch)
        {
            // Setup Elasticsearch sink with basic options and error handling
            try
            {
                var httpAccessor = services.GetRequiredService<IHttpContextAccessor>(); // Add HttpContextAccessor
                loggerConfig.Enrich.WithEcsHttpContext(httpAccessor);
                loggerConfig.WriteTo.Elasticsearch(
                    new[] { new Uri(elasticsearchUrl) },
                    opts =>
                    {
                        opts.BootstrapMethod = BootstrapMethod.Failure; // Continue on failure
                    },
                    transport =>
                    {
                        // Configure basic authentication
                        transport.Authentication(new BasicAuthentication(elasticUsername, elasticPassword));
                    }
                );
            }
            catch (Exception ex)
            {
                Log.Warning(ex, "Elasticsearch sink failed to initialize. Logging to console and file only.");
            }
        }
    });




/*// 3b) (If your React dev server is on localhost:3000) Allow CORS for websockets
    builder.Services.AddCors(o => o.AddPolicy("CorsPolicy", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    }));*/


    // Service and Middleware setup
    builder.Services.AddControllers(options =>
        {
            options.Filters.Add<RequestValidationFilter>();
            options.Filters.Add<ExceptionFilter>();
        });
    builder.Services.AddSingleton(new InMemoryChatHistory());
    builder.Services.AddSingleton<IChatService, ChatService>();
    builder.Services.AddSignalR();
    builder.Services.AddScoped<IImageService, ImageService>();
    builder.Services.AddScoped<IArticleService, ArticleService>();
    builder.Services.AddScoped<IParagraphService, ParagraphService>();
    builder.Services.AddScoped<IQuestionService, QuestionService>();
    builder.Services.AddScoped<IValidationSettingsService, ValidationSettingsService>();
    builder.Services.AddScoped<ICategoryService, CategoryService>();
    builder.Services.AddScoped<IAuthService, AuthService>();
    builder.Services.AddScoped<IUserService, UserService>();
    builder.Services.AddScoped<ITokenService, TokenService>();
    builder.Services.AddScoped<IArticleSessionService, ArticleSessionService>();
    builder.Services.AddScoped<IParagraphSessionService, ParagraphSessionService>();
    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new() { Title = "Pappa´s API", Version = "v1" });

        // Define the OAuth2.0 scheme that's in use (i.e., Implicit Flow)
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer"
        });

        c.AddSecurityRequirement(new OpenApiSecurityRequirement()
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    },
                    Scheme = "oauth2",
                    Name = "Bearer",
                    In = ParameterLocation.Header,
                },
                new List<string>()
            }
        });
    });
    builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
    builder.Services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
    builder.Services.AddCors(options => options.AddPolicy("AllowAll", p => p.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader().AllowCredentials()));





    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = builder.Configuration["Jwt:Issuer"],
                ValidAudience = builder.Configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
                ClockSkew = TimeSpan.Zero
            };
        });

    var app = builder.Build();

    app.UseSerilogRequestLogging();

    app.Use(async (context, next) =>
    {
        try
        {
            await next();
        }
        catch (Exception ex)
        {
            Log.Error(ex, "Unhandled exception occurred while processing request.");
            throw;
        }
    });

    using (var scope = app.Services.CreateScope())
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationContext>();
        dbContext.Database.Migrate();
    }

    bool usePrometheus = configuration.GetValue<bool>("UsePrometheus");

    // no touchy
    app.UseCors("AllowAll");

    app.UseRouting();
    app.UseAuthentication();    //NEW AUTHENTICATION
	app.UseAuthorization();

	if (usePrometheus)
    {
		app.UseMetricServer();
		app.UseHttpMetrics();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapMetrics();
        });
	}


    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();
    app.MapHub<ChatHub>("/chatHub");
    app.MapControllers();
    app.Run();

}
catch (Exception ex)
{
    Log.Fatal(ex, "Application terminated unexpectedly");
}
finally
{
    Log.CloseAndFlush();
}

public partial class Program { }
