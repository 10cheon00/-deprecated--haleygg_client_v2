const tokenStore = {
  namespaced: true,
  state: () => ({
    accessToken: "",
    refreshToken: ""
  }),
  getters: {
    getAccessToken(state) {
      return state.accessToken;
    },
    getRefreshToken(state) {
      return state.refreshToken;
    },
    isTokenExists(state) {
      return state.accessToken.length > 0 && state.refreshToken.length > 0;
    }
  },
  mutations: {
    setAccessToken(state, token) {
      state.accessToken = token
    },
    setRefreshToken(state, token) {
      state.refreshToken = token
    },
    flushToken(state) {
      state.accessToken = "";
      state.refreshToken = "";
    }
  }
}


export default tokenStore