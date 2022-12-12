export const validateEmail = (email: string) => {
  if (email.length === 0) {
    return ({
      isValid: false,
      reason: 'Email is required'
    })
  }
  else if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
    return ({
      isValid: false,
      reason: 'Email is invalid'
    })
  }
  else {
    return ({
      isValid: true,
      reason: ''
    })
  }
}

export const validatePassword = (password: string) => {
  if (password.length === 0) {
    return ({
      isValid: false,
      reason: 'Password is required'
    })
  }
  else if (password.length < 7) {
    return ({
      isValid: false,
      reason: 'Password too short'
    })
  }
  else {
    return ({
      isValid: true,
      reason: ''
    })
  }
}
