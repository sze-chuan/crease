using System.Net;
using System.Net.Mime;
using Microsoft.AspNetCore.Diagnostics;

namespace Crease.WebUI.Exceptions;

public static class ExceptionHandler
{
    public static async Task WriteResponseAsync(HttpContext httpContext)
    {
        var exceptionDetails = httpContext.Features.Get<IExceptionHandlerFeature>();
        var ex = exceptionDetails?.Error;

        // Should always exist, but best to be safe!
        if (ex == null)
        {
            return;
        }

        var response = httpContext.Response;
        response.ContentType = MediaTypeNames.Text.Plain;
        response.StatusCode = ex switch
        {
            HttpResponseException exception => exception.StatusCode,
            _ => (int) HttpStatusCode.InternalServerError
        };

        if (response.StatusCode != 403 && response.StatusCode != 500)
        {
            await response.WriteAsync(ex.Message);     
        }
    }
}