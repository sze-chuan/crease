using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Crease.Application.Cards.Queries.GetCards;
using Crease.Application.Common.Interfaces;
using Crease.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Crease.Application.Cards.Commands
{
    public class CreateCardCommand : IRequest<int>
    {
        public int BankCardId { get; set; }
        
        public string Name { get; set; }
        
        public string CardNumber { get; set; }
        
        public DateTime StartDate { get; set; }
    }

    public class CreateCardCommandHander : IRequestHandler<CreateCardCommand, int>
    {
        private readonly IApplicationDbContext _context;

        public CreateCardCommandHander(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateCardCommand request, CancellationToken cancellationToken)
        {
            var entity = new Card
            {
                BankCardId = request.BankCardId,
                Name = request.Name,
                CardNumber = request.CardNumber,
                StartDate = request.StartDate
            };
            
            _context.Cards.Add(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}