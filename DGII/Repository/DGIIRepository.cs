using DGII.DatabaseContext;
using DGII.Model;

namespace DGII.Repository
{
    public class DGIIRepository : IRepository
    {
        private DGIIContext _context;
        public DGIIRepository(DGIIContext context)
        {
            _context = context;
        }

        public void AddTaxPayers(IEnumerable<TaxPayer> taxPayers)
        {
            foreach (var taxPayer in taxPayers)
            {
                _context.Add(taxPayer);
            }
            _context.SaveChanges();
        }

        public void AddTaxReceipts(IEnumerable<TaxReceipt> taxReceipts)
        {
            foreach (var taxReceipt in taxReceipts)
            {
                _context.Add(taxReceipt);
            }
            _context.SaveChanges();
        }

        public TaxDetail GetTaxDetail(string taxPayerId)
        {
            var receipts = _context.TaxReceipts.Where(t => t.TaxPayerId == taxPayerId).ToList();
            var totalTaxes = receipts.Sum(t => t.TaxAmount);

            return new TaxDetail { Total = totalTaxes, TaxReceipts = receipts };
        }

        public IEnumerable<TaxPayer> GetTaxPayers()
        {
            var taxPayers = _context.TaxPayers.ToList();
            return taxPayers;
        }

        public IEnumerable<TaxReceipt> GetTaxReceipts()
        {
            var taxReceipts = _context.TaxReceipts.ToList();
            return taxReceipts;
        }
    }
}
