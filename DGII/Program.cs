using DGII.DatabaseContext;
using DGII.Repository;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);
const string corsPolicy = "AllowAll";

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<DGIIContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DGIIDatabase")));

builder.Services.AddScoped<IRepository, DGIIRepository>();
builder.Services.AddControllers();
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
