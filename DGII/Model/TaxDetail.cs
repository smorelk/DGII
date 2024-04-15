using System.Text.Json.Serialization;

namespace DGII.Model
{
    public class TaxDetail
    {
        [JsonPropertyName("totalITBIS")]
        public float Total { get; set; }

        [JsonPropertyName("comprobantes")]
        public IEnumerable<TaxReceipt> TaxReceipts { get; set; }
    }
}
