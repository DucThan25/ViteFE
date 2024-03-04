// các hàm dùng để gọi API, gọi hàm khác trong mutations để thay đổi state của của đối tượng trong store
import AuthenApi from '@/api/AuthenApi'

export const actions = {
  async login ({commit, state}, postData) {
    let response = await AuthenApi.login(this._vm.axios, postData)
    try {
      commit('setAccessInfo', response.data.access_token)
      console.log(state)
    } catch (err) {
      throw err
    }
    return response
  },
  setCurrentUser ({ commit, state }, user) {
    commit('setCurrentUser', user)
  },
  setAccessInfo ({ commit, state }, accessInfo) {
    commit('setAccessInfo', accessInfo)
  },
  clearCurrentUser ({ commit, state }) {
    commit('clearCurrentUser')
  }
}
