
import users from 'constants/users'

// Catch all api requests called from the app and simulate backend process.
let realFetch = window.fetch
window.fetch = (url: any, req: any) => {

  return new Promise((resolve, reject) => {
    // Wrap in timeout to simulate server api call.
    setTimeout(() => {
      if (url.endsWith('/authenticate') && req.method === 'POST') {
        // Get credentials.
        const params = JSON.parse(req.body)
        // Check if credentials match with existing user.
        const user = users.find(x => x.email === params.email && x.password === params.password)
        // Throw error 400 if credentials are not valid.
        if (!user) return error('Username or password is incorrect')
        // Send user data if credentials match with some user.
        return success({
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          token: 'fake-token'
        })
      }

      // Pass through any requests not handled above
      realFetch(url, req).then(response => resolve(response))

      // Handle success response.
      function success(content: object) {
        resolve({ status: 200, body: Promise.resolve(JSON.stringify(content)) })
      }
      // Handle error response.
      function error(message: string) {
        resolve({ status: 400, body: Promise.resolve(JSON.stringify({ message })) })
      }
    }, 500)
  })
}
