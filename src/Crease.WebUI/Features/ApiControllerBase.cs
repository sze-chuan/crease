using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Crease.WebUI.Features;

[ApiController]
public abstract class ApiControllerBase : ControllerBase
{
    private ISender _mediator = null!;

    protected ISender Mediator => _mediator ??= HttpContext.RequestServices.GetRequiredService<ISender>();
}