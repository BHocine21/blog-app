const logout = (navigate) => {
  console.log('nooooooo')
  localStorage.removeItem('currentUser');
  navigate('/')
}

export default logout
