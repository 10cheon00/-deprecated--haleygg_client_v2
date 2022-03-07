<template>
  <MenuBar class="tabmenu" :model="items">
    <template #start>
      <div class="text-4xl mr-4" @click="routeToHome()">Haley.GG</div>
    </template>
    <template #end>
      <div class="flex align-items-center">
        <!-- login status -->
        <div class="pr-3">
          <div v-if="isAuthenticated">로그인됨</div>
          <div v-else class="pi pi-cog" @click="loginButtonClicked()"></div>
        </div>

        <form @submit.prevent="search()">
          <div class="flex align-items-center">
            <div class="p-input-icon-right">
              <i class="pi pi-search" @click="search()" />
              <InputText
                class="p-inputtext-sm"
                placeholder="검색"
                type="text"
                v-model="playerName"
              />
            </div>
          </div>
        </form>
      </div>
      <LoginModal />
    </template>
  </MenuBar>
</template>

<script>
import { defineComponent, ref, provide, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import InputText from "primevue/inputtext";
import MenuBar from "primevue/menubar";

import LoginModal from "@/components/LoginModal.vue";
import ServerApi from "@/api/server/module.js";

export default defineComponent({
  components: {
    InputText,
    LoginModal,
    MenuBar,
  },
  setup() {
    const isLoginButtonClicked = ref(false);
    provide("isLoginButtonClicked", isLoginButtonClicked);
    const loginButtonClicked = () => {
      if (isLoginButtonClicked.value == false)
        isLoginButtonClicked.value = true;
    };
    const isAuthenticated = ref(false);

    const router = useRouter();
    const vuexStore = useStore();
    const playerName = ref("");
    const search = () => {
      router.push({
        name: "UserInformationView",
        params: {
          playerName: playerName.value,
        },
      });
    };

    const routeToHome = () => {
      router.push({
        name: "HomeView",
      });
    };

    onMounted(() => {
      if (vuexStore.getters["tokenStore/isTokenExists"]) {
        ServerApi.requestVerifyToken()
          .then((response) => {
            console.log(response);
            isAuthenticated.value = true;
          })
          .catch((error) => {
            console.log(error);
            isAuthenticated.value = false;
          });

        /*
          
[06/Mar/2022 12:58:58] "POST /api/auth/token/verify/ HTTP/1.1" 401 65
[06/Mar/2022 12:58:58] "POST /api/auth/token/refresh/ HTTP/1.1" 200 21
Unauthorized: /api/players/Hehe/
[06/Mar/2022 12:58:58] "GET /api/players/Hehe/ HTTP/1.1" 401 183
[06/Mar/2022 12:58:58] "POST /api/auth/token/verify/ HTTP/1.1" 200 2
[06/Mar/2022 12:58:58] "POST /api/auth/token/refresh/ HTTP/1.1" 200 218
verify가 가장 먼저 요청됨. 이게 실패하니까 refresh가 요청됨.
이와중에 player detail을 요청함. refresh가 끝나지 않아 토큰이 올바르지 않음.
player detail이 실패하여 다시 refresh를 요청함. 이 때는 verify-refresh가 성공한 상태. verify 재요청
player detail-refresh가 성공함. player detail재요청.

verify말고 refresh할 때 유저명을 반환받는 방법을 찾아야겠다. 

          */
      }
    });

    return {
      isAuthenticated,
      items: [
        {
          label: "Elo 랭킹",
          icon: "pi pi-fw pi-chart-line",
          to: "/elo-rank/",
        },
        {
          label: "맵별 통계",
          icon: "pi pi-fw pi-eye",
          to: "/map/",
        },
      ],
      playerName,
      search,
      routeToHome,
      loginButtonClicked,
    };
  },
});
</script>

<style scoped>
.p-menubar {
  background: linear-gradient(120deg, #fea29a, #fe62d4);
  border: none;
  border-radius: 0px;
}
</style>
