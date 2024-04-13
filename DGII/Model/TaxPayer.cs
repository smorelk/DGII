using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace DGII.Model
{
    public class TaxPayer
    {
        [Key]
        // TaxPayerID, known as RNC (Registro Nacional Contribuyente
        [JsonPropertyName("rncCedula")]
        public string TaxId { get; set; }


        // Can be an entity name or a physical person name.
        [JsonPropertyName("nombre")]
        public string Name { get; set; }

        // A physical person or a corporation.
        [JsonPropertyName("tipo")]
        public string Type { get; set; }

        [JsonPropertyName("estatus")]
        public string Status { get; set; }
    }
}
