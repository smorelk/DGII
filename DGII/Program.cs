using DGII.DatabaseContext;
using DGII.Repository;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<DGIIContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DGIIDatabase")));

builder.Services.AddScoped<IRepository, DGIIRepository>();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors();
app.UseHttpsRedirection();
app.MapControllers();
app.Run();
