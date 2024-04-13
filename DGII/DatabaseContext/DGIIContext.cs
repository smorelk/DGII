using DGII.Model;
using Microsoft.EntityFrameworkCore;

namespace DGII.DatabaseContext
{
    public class DGIIContext : DbContext
    {
        public DbSet<TaxPayer> TaxPayers { get; set; }
        public DbSet<TaxReceipt> TaxReceipts { get; set; }

        public DGIIContext(DbContextOptions<DGIIContext> options)
            : base(options)
        {

        }
    }
}
