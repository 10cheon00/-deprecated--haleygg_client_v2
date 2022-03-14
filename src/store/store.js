import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate"

import tokenStore from "@/store/token-store.js"

const VuexStore = createStore({
  modules: {
    tokenStore
  },
  plugins: [createPersistedState({
    paths: [
      "tokenStore"
    ]
  })],
})


export default VuexStore