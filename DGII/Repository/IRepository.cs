using DGII.Model;

namespace DGII.Repository
{
    public interface IRepository
    {
        IEnumerable<TaxPayer> GetTaxPayers();
        IEnumerable<TaxReceipt> GetTaxReceipts();

        TaxDetail GetTaxDetail(string taxPayerId);

        void AddTaxPayers(IEnumerable<TaxPayer> taxPayers);
        void AddTaxReceipts(IEnumerable<TaxReceipt> taxReceipts);
    }
}
