import React from 'react';
import { createRoot } from 'react-dom/client'

import './css/index.css'

import App from './App'

const boot = () => {
  let users = [
    { id: 6532984102,
      role: 'customer',
      email: 'thomas.pettis@gmail.com',
      password: 'thomas.pettis@gmail.com',
      firstName: 'Thomas',
      lastName: 'Pettis'
    },
    { id: 3619864825,
      role: 'customer',
      email: 'angela.armstrong@gmail.com',
      password: 'angela.armstrong@gmail.com',
      firstName: 'Angela',
      lastName: 'Armstrong'
    },
    { id: 3264598632,
      role: 'admin',
      email: 'gary.lewis@gmail.com',
      password: 'gary.lewis@gmail.com',
      firstName: 'Gary',
      lastName: 'Lewis'
    }];
    let realFetch = window.fetch;
    window.fetch = (url: any, opts: any) => {
        const isLoggedIn = opts.headers['Authorization'] === 'Bearer fake-jwt-token';

        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
              // authenticate - public
              if (url.endsWith('/authenticate') && opts.method === 'POST') {
                  const params = JSON.parse(opts.body);
                  const user = users.find(x => x.email === params.email && x.password === params.password);
                  if (!user) return error('Username or password is incorrect');
                  return ok({
                      id: user.id,
                      email: user.email,
                      firstName: user.firstName,
                      lastName: user.lastName,
                      role: user.role,
                      token: 'fake-jwt-token'
                  });
              }

              // get users - secure
              if (url.endsWith('/users') && opts.method === 'GET') {
                  if (!isLoggedIn) return unauthorised();
                  return ok(users);
              }

              // pass through any requests not handled above
              realFetch(url, opts).then(response => resolve(response));

              // private helper functions

              function ok(body) {
                  resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) })
              }

              function unauthorised() {
                  resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorised' })) })
              }

              function error(message) {
                  resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) })
              }
            }, 500);
        });
    }


  const root = createRoot(document.getElementById('root'));

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

boot()
