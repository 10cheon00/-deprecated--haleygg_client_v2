<template>
  <div id="navbar">
    <div id="top">
      <img src="/logo.png" @click="routeToHome()" />
      <PlayerSearchBar class="player-search-bar" />
      <span class="credential-user-name">
        {{ userName }}
      </span>
      <Button
        v-if="userName"
        class="credential-button p-button-rounded"
        icon="pi pi-sign-out"
        @click="logoutButtonClicked()"
      />
      <Button
        v-else
        icon="pi pi-user"
        class="credential-button p-button-rounded"
        @click="loginButtonClicked()"
      />
    </div>
    <PlayerSearchBar class="player-search-bar p-fluid" />

    <div id="router">
      <router-link
        v-for="item in items"
        :key="item"
        :class="{
          active: item.to == $route.path ? true : false,
          button: true,
        }"
        :to="item.to"
      >
        <i :class="item.iconClass" />
        {{ item.label }}
      </router-link>
    </div>
    <LoginModalForm />
  </div>
</template>

<script>
import { defineComponent, ref, provide, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Button from "primevue/button";

import LoginModalForm from "@/components/FormLoginModal.vue";
import PlayerSearchBar from "@/components/PlayerSearchBar.vue";
import ServerApi from "@/api/server/module.js";

export default defineComponent({
  components: {
    Button,
    LoginModalForm,
    PlayerSearchBar,
  },
  setup() {
    const router = useRouter();
    const vuexStore = useStore();

    const isLoginButtonClicked = ref(false);
    provide("isLoginButtonClicked", isLoginButtonClicked);
    const loginButtonClicked = () => {
      if (isLoginButtonClicked.value == false)
        isLoginButtonClicked.value = true;
    };
    const logoutButtonClicked = () => {
      vuexStore.commit("tokenStore/flushToken");
      router.go();
    };

    const routeToHome = () => {
      router.push({
        name: "HomeView",
      });
    };

    const userName = computed(() => {
      return vuexStore.getters["tokenStore/getUserName"];
    });

    const items = computed(() => {
      const list = [
        {
          label: "Elo 랭킹",
          iconClass: "pi pi-fw pi-chart-line",
          to: "/elo-rank/",
        },
        {
          label: "맵별 통계",
          iconClass: "pi pi-fw pi-image",
          to: "/map/",
        },
        {
          label: "프로리그 통계",
          iconClass: "pi pi-fw pi-sort-amount-up",
          to: "/proleague/",
        },
        {
          label: "상대 전적 검색",
          iconClass: "pi pi-fw pi-users",
          to: "/compare/",
        },
      ];

      if (userName.value.length > 0) {
        list.push({
          label: "전적 입력",
          iconClass: "pi pi-fw pi-cloud-upload",
          to: "/add-result/",
        });
      }
      return list;
    });

    onMounted(async () => {
      if (vuexStore.getters["playerListStore/getPlayerList"].length == 0) {
        const response = await ServerApi.fetchPlayerList();
        vuexStore.commit("playerListStore/setPlayerList", response.data);
      }
    });

    return {
      items,
      userName,
      routeToHome,
      loginButtonClicked,
      logoutButtonClicked,
    };
  },
});
</script>

<style scoped>
i {
  vertical-align: middle;
}

img {
  image-rendering: pixelated;
}

#navbar {
  background-color: #fd7f71;
  border: none;
  border-radius: 0px;
}

#navbar > * {
  margin-top: auto;
  margin-bottom: auto;
  padding: 0.5rem;
}

#navbar #top {
  display: flex;
}

#navbar #top img {
  cursor: pointer;
  display: block;
  margin-right: auto;
  margin-top: auto;
  width: 153px;
  height: 33px;
}

#navbar #top .credential-button {
  background-color: #fea29a;
  border: none;
}

#navbar #top .credential-user-name {
  flex: 0 0 none;
  align-self: center;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}

#navbar #top .player-search-bar {
  display: none;
}

#navbar #router {
  background-color: #fea29a;
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
}

#navbar #router .button {
  border-bottom: 3px solid #00000000;
  color: black;
  flex: 0 0 auto;
  margin: 0 1rem;
  min-width: 5rem;
  padding: 0.75rem 0;
  text-align: center;
  transition: color 0.25s;
}

#navbar #router .button:active {
  border-bottom: 3px solid white;
  color: white;
}

#navbar #router .button:hover {
  border-bottom: 3px solid white;
  color: white;
}

#navbar #router .active {
  border-bottom: 3px solid white;
  color: white;
}

#navbar > .player-search-bar {
  background-color: #fd7f71;
  border: none;
}

@media (min-width: 768px) {
  #navbar > .player-search-bar {
    display: none;
  }

  #navbar #top .player-search-bar {
    display: block;
  }
}
</style>
