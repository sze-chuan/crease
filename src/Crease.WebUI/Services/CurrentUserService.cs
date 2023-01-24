using System.Security.Claims;

namespace Crease.WebUI.Services;

public class CurrentUserService : ICurrentUserService
{
    private const string DevelopmentUserId = "development";
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly bool _useDevelopmentUser;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor, bool useDevelopmentUser)
    {
        _httpContextAccessor = httpContextAccessor;
        _useDevelopmentUser = useDevelopmentUser;
    }

    public string UserId => _useDevelopmentUser
        ? DevelopmentUserId
        : _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
}