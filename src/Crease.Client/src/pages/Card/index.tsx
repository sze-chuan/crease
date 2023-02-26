import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Layout from '../../components/Layout';
import CardDetails from './CardDetails';
import CardStatement from './CardStatement';
import AddTransaction from '../../components/AddTransaction';
import {
  getBankCards,
  getCards,
  getCardStatement,
  setCardStatement,
} from '../../slices/card';
import {
  GetCardStatementByMonthYearClient,
  CreateCardStatementClient,
  CreateCardStatementRequest,
  ICardStatementDto,
} from '../../api/apiClient';
import { useAuth } from '../../auth/authContext';

const Card = (): JSX.Element => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const cards = useSelector(getCards);
  const bankCards = useSelector(getBankCards);
  const cardStatement = useSelector(getCardStatement);
  const card = cards.find((x) => x.id === id);
  const bankCard = bankCards.find((x) => x.id === card?.bankCardId);

  const { acquireToken } = useAuth();

  useEffect(() => {
    const fetchCardStatementData = async () => {
      const statementMonthYear = new Date();
      const getCardStatementClient = new GetCardStatementByMonthYearClient(
        process.env.REACT_APP_API_URL
      );
      const token = await acquireToken();
      getCardStatementClient.setAuthToken(token);
      const cardStatement = await getCardStatementClient.get(
        card?.id,
        statementMonthYear
      );

      if (cardStatement === null) {
        const createCardStatementClient = new CreateCardStatementClient(
          process.env.REACT_APP_API_URL
        );
        createCardStatementClient.setAuthToken(token);
        const result = await createCardStatementClient.create({
          cardId: card?.id,
          monthYear: statementMonthYear,
          bankCardId: card?.bankCardId,
        } as CreateCardStatementRequest);

        dispatch(
          setCardStatement({
            id: result,
            monthYear: statementMonthYear,
          } as ICardStatementDto)
        );
      } else {
        dispatch(setCardStatement(cardStatement));
      }
    };

    fetchCardStatementData();
  }, []);

  return (
    <Layout>
      <Stack>
        {card && bankCard ? (
          <React.Fragment>
            <CardDetails card={card} bankCard={bankCard}></CardDetails>
            <CardStatement cardStatement={cardStatement} />
          </React.Fragment>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </Stack>
      <AddTransaction card={card} cardStatementId={cardStatement?.id} />
    </Layout>
  );
};

export default Card;
