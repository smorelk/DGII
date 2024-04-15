using DGII.DatabaseContext;
using DGII.Errors;
using DGII.Model;
using DGII.Repository;
using Microsoft.AspNetCore.Mvc;

namespace DGII.Controllers
{
    [ApiController]
    [Route("api")]
    public class TaxReceiptController : ControllerBase
    {

        private IRepository dgiiRepository;

        public TaxReceiptController(IRepository repository)
        {
            dgiiRepository = repository;
        }

        [HttpGet("/receipts/all")]
        public async Task<ActionResult<List<TaxReceipt>>> GetTaxReceipts()
        {
            var taxReceipts = dgiiRepository.GetTaxReceipts();
            if (taxReceipts == null)
            {
                return NotFound();
            }

            return Ok(taxReceipts);
        }

        [HttpPost("/receipts/insert")]
        public async Task<ActionResult> AddTaxReceipts([FromBody]List<TaxReceipt> taxReceipts)
        {
            try
            {
                dgiiRepository.AddTaxReceipts(taxReceipts);
            } catch(InvalidOperationException)
            {
                var errorType = new Error { Kind = ErrorType.ObjectFieldNullError };
                HttpContext.Features.Set(errorType);
                return BadRequest();
            }
            return Ok();
        }

        [HttpGet("/receipts/{taxPayerId}")]
        public async Task<ActionResult> GetTaxDetail(string taxPayerId)
        {
            if (taxPayerId == null)
            {
                return BadRequest("Tax Payer ID missing");
            }
            var detail = dgiiRepository.GetTaxDetail(taxPayerId);
            if (detail == null)
                return NotFound();

            return Ok(detail);
        }


    }
}
