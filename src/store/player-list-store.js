const playerListStore = {
  namespaced: true,
  state: () => ({
    playerList: []
  }),
  getters: {
    getPlayerList(state) {
      return state.playerList;
    },
  },
  mutations: {
    setPlayerList(state, playerList) {
      state.playerList = playerList
    },
  }
}


export default playerListStore