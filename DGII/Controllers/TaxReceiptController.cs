using DGII.DatabaseContext;
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
            dgiiRepository.AddTaxReceipts(taxReceipts);
            return Ok();
        }


    }
}
