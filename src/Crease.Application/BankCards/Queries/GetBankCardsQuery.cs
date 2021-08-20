using System.Collections;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Crease.Application.Common.Interfaces;
using Crease.Domain.Entities;
using MediatR;

namespace Crease.Application.BankCards.Queries
{
    public class GetBankCardsQuery : IRequest<IEnumerable<BankCardDto>>
    {
    }

    public class GetBankCardsQueryHandler : IRequestHandler<GetBankCardsQuery, IEnumerable<BankCardDto>>
    {
        private readonly IBankCardsService _bankCardsService;
        private readonly IMapper _mapper;

        public GetBankCardsQueryHandler(IBankCardsService context, IMapper mapper)
        {
            _bankCardsService = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<BankCardDto>> Handle(GetBankCardsQuery request, CancellationToken cancellationToken)
        {
            return await Task.Run(() => _mapper.Map<IList<BankCard>, IList<BankCardDto>>(_bankCardsService.GetBankCards()),
                cancellationToken);
        }
    }
}