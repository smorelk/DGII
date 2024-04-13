using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DGII.Model
{
    public class TaxReceipt
    { 
        // Link to TaxPayer
        [JsonPropertyName("rncCedula")]
        [ForeignKey("TaxId")]
        public string TaxPayerId { get; set; }
        // Known as NCF (Numero comprobante fiscal). 
        [Key]
        [JsonPropertyName("NCF")]
        public string TaxReceiptNumber { get; set; }
        [JsonPropertyName("monto")]
        public float Amount { get; set; }
        // 18% of Amount, known as ITBIS.
        [JsonPropertyName("itbis18")]
        public float TaxAmount { get; set; }
    }
}
