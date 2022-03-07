const tokenStore = {
  namespaced: true,
  state: () => ({
    username: "",
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
    },
    getUserName(state) {
      return state.username;
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
      state.username = "";
    },
    setUserNameFromResponse(state, response) {
      const payload = response.data.access.split(".")[1];
      const decodedPayload = JSON.parse(window.atob(payload));
      state.username = decodedPayload.username;
      console.log(decodedPayload.username)
    }
  }
}


export default tokenStore