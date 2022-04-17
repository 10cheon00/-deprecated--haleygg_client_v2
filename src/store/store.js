import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate"

import playerListStore from "@/store/player-list-store.js"
import tokenStore from "@/store/token-store.js"

const VuexStore = createStore({
  modules: {
    tokenStore,
    playerListStore,
  },
  plugins: [createPersistedState({
    paths: [
      "tokenStore"
    ]
  })],
})


export default VuexStore