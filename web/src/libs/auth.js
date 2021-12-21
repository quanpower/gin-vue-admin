
const TokenKey = 'ly-token'
const UserIDKey = 'ly-userID'
export function getToken () {
  return localStorage.getItem(TokenKey)
}

export function setToken (token) {
  localStorage.setItem(TokenKey, token)
}

export function removeToken () {
  localStorage.removeItem(TokenKey)
}

export function getUserID () {
  return localStorage.getItem(UserIDKey)
}

export function setUserID (UserID) {
  localStorage.setItem(UserIDKey, UserID)
}

export function removeUserID () {
  localStorage.removeItem(UserIDKey)
}
