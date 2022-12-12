import { BehaviorSubject } from 'rxjs'

import { UserCredentials } from 'types/types'

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')))

function handleResponse(response: object) {
  return response.body.then((body: string) => {
    const data = body && JSON.parse(body)
    if (response.status === 400) {
      return Promise.reject(data.message)
    }

    return data
  })
}

const authenticationService = {
  login: (userCredentials: UserCredentials) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email: userCredentials.email, password: userCredentials.password })
    }

    return fetch(`http://127.0.0.1:5173/authenticate`, requestOptions)
      .then(handleResponse)
      .then(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        window.localStorage.setItem('currentUser', JSON.stringify(user))
        currentUserSubject.next(user)

        return user
      })
  },
  logout: () => {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser')
    currentUserSubject.next(null)
  },
}

export default authenticationService
