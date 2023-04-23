function isLoggedIn() {
  const userFromLocalStorage = localStorage.getItem("isLoggedIn")
  return userFromLocalStorage === "true"
}

export default isLoggedIn
