﻿using DGII.Repository;
using DGII.DatabaseContext;
using Microsoft.AspNetCore.Mvc;
using DGII.Model;
using DGII.Errors;

namespace DGII.Controllers
{
    [ApiController]
    [Route("api")]
    public class TaxPayerController : ControllerBase
    {
        private IRepository dgiiRepository;
        public TaxPayerController(IRepository repository)
        {
            this.dgiiRepository = repository;
        }

        [HttpGet("/taxpayers/all")]
        public async Task<ActionResult<List<TaxPayer>>> GetTaxPayers()
        {
            var taxPayers = dgiiRepository.GetTaxPayers();

            if (taxPayers == null)
            {
                return NotFound();
            }

            return Ok(taxPayers);
        }

        [HttpPost("/taxpayers/insert")]
        public async Task<ActionResult> AddTaxPayers([FromBody]IEnumerable<TaxPayer> taxPayers)
        {
            try
            {
                dgiiRepository.AddTaxPayers(taxPayers);
            } catch (InvalidOperationException)
            {
                var errorType = new Error { Kind = ErrorType.ObjectFieldNullError };
                HttpContext.Features.Set(errorType);
                return BadRequest();
            }
            return Ok();
        }
    }
}
