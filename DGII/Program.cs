using DGII.DatabaseContext;
using DGII.Errors;
using DGII.Repository;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);
const string corsPolicy = "AllowAll";

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<DGIIContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DGIIDatabase")));

builder.Services.AddScoped<IRepository, DGIIRepository>();

// Handle validation errors
builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(opt =>
    {
        opt.InvalidModelStateResponseFactory = context =>
        {
            return new BadRequestObjectResult(context.ModelState)
            {
                StatusCode = 400,

                Value = "Some fields are missing. try again.",

            };
        };
    });

// Global exception handler
builder.Services.AddProblemDetails(options =>
        options.CustomizeProblemDetails = (context) =>
        {

            var error= context.HttpContext.Features.Get<Error>();
            if (error is not null)
            {
                (string Detail, string Type) details = error.Kind switch
                {
                    ErrorType.ObjectFieldNullError =>
                    ("Null field", "Null fields aren't allowed. "),
                };

                context.ProblemDetails.Type = details.Type;
                context.ProblemDetails.Title = "Bad Input";
                context.ProblemDetails.Detail = details.Detail;
            }
        }
    );

builder.Services.AddSwaggerGen();
builder.Services.AddCors(opts =>
{
    opts.AddPolicy(name: corsPolicy, builder =>
    {
        builder.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors(corsPolicy);
app.UseHttpsRedirection();
app.MapControllers();
app.Run();
