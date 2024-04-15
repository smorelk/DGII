using Microsoft.AspNetCore.Mvc;

namespace DGII.Errors
{
    public class Error
    {
        public ErrorType Kind { get; set; }
    }

    public enum ErrorType
    {
        ObjectFieldNullError,
    }
}
