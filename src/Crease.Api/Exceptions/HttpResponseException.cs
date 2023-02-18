using System.Net;

namespace Crease.WebUI.Exceptions;

public class HttpResponseException : Exception
{
    public HttpResponseException(int statusCode, string message = null) : base(message) =>
        StatusCode = statusCode;

    public HttpResponseException(HttpStatusCode statusCode, string message = null): base(message) =>
        StatusCode = (int)statusCode;

    public int StatusCode { get; }
}