// các hàm đọc các giá trị thuộc tính của đối tượng trong store
export const getters = {
  isAuthenticated: (state, getters, rootState) => {
    /*
    if (typeof state.accessToken !== 'undefined' && state.accessToken) {
      return true
    } else {
      return false
    }
    */
   return true
  },
  accessToken: (state, getters, rootState) => {
    return state.accessToken
  },
  user: (state, getters, rootState) => {
    if (typeof state.user !== 'undefined') {
      return state.user
    } else {
      return undefined
    }
  },
  isAdmin: (state, getters, rootState) => {
    try {
      if (!getters.isAuthenticated) return false
      if (state.user.role === 1) return true
      return false
    } catch (error) {
      return false
    }
  }
}
