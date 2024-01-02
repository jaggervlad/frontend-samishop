import { rest } from 'msw';
import {
  MOCK_PERSON,
  MOCK_PERSONS_RESPONSE,
  MOCK_PLANET,
  MOCK_SPECIE,
  MOCK_VEHICLE,
} from './data.mock';

export const handlers = [
  rest.get('https://swapi.dev/api/people/*', (req, res, ctx) => {
    const page = req.url.searchParams.get('page') || '1';
    const id = req.params['0'];

    if (id) {
      return res(ctx.status(200), ctx.json(MOCK_PERSON));
    }

    return res(ctx.status(200), ctx.json(MOCK_PERSONS_RESPONSE['1']));
  }),
  rest.get('https://swapi.dev/api/people/1', (req, res, ctx) => {}),

  rest.get('https://swapi.dev/api/species/*', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(MOCK_SPECIE));
  }),
  rest.get('https://swapi.dev/api/planets/*', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(MOCK_PLANET));
  }),
  rest.get('https://swapi.dev/api/vehicles/*', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(MOCK_VEHICLE));
  }),
];
