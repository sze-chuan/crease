using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Crease.Application.Common.Interfaces;
using Crease.Domain.Entities;
using MediatR;

namespace Crease.Application.BankCards.Queries
{
    public class GetBankCardsQuery : IRequest<BankCardsVm>
    {
    }

    public class GetBankCardsQueryHandler : IRequestHandler<GetBankCardsQuery, BankCardsVm>
    {
        private readonly IBankCardsService _bankCardsService;
        private readonly IMapper _mapper;

        public GetBankCardsQueryHandler(IBankCardsService context, IMapper mapper)
        {
            _bankCardsService = context;
            _mapper = mapper;
        }

        public async Task<BankCardsVm> Handle(GetBankCardsQuery request, CancellationToken cancellationToken)
        {
            return await Task.Run(() => new BankCardsVm
                {
                    BankCards = _mapper.Map<IList<BankCard>, IList<BankCardDto>>(_bankCardsService.GetBankCards())
                },
                cancellationToken);
        }
    }
}