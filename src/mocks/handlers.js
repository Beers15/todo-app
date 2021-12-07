import { rest } from 'msw'
import base64 from 'base-64';

export const handlers = [
  rest.post('https://api-integration-server.herokuapp.com/signin', (req, res, ctx) => {
    let basic = req.headers._headers.authorization.split(' ').pop();
    let [user, pass] = base64.decode(basic).split(':');

    let capabilities = user === 'alexTheAdmin' ? ['read', 'write', 'create', 'update', 'delete'] : ['read'];

    const response = {
      user: { username: user, password: pass, capabilities },
      token: 'mytokenhere'
    };
    return res(
      ctx.status(200),
      ctx.json(response)
    );
  }),

  rest.get('https://api-integration-server.herokuapp.com/signup', (req, res, ctx) => {
    const user = {
      user: { username: user, password: pass, capabilities: ['read', 'write', 'create', 'update', 'delete'] },
      token: 'mytokenhere',
    };
  
    return res(
      ctx.status(201),
      ctx.json([{user}])
    );
  }),
]