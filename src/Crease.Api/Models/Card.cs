using Crease.WebUI.Models.Common;

namespace Crease.WebUI.Models;

public class Card : Entity
{
    public Guid BankCardId { get; set; }

    public string Name { get; set; }
        
    public string UserId { get; set; }
        
    public string CardNumber { get; set; }
        
    public DateTime StartDate { get; set; }
}