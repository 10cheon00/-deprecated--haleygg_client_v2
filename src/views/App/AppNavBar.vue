<template>
  <MenuBar class="tabmenu" :model="items">
    <template #start>
      <div class="text-4xl mr-4" @click="routeToHome()">Haley.GG</div>
    </template>
    <template #end>
      <div class="flex align-items-center">
        <!-- login status -->
        <div class="pi pi-cog pr-3" @click="loginButtonClicked()"></div>

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
import { defineComponent, ref, provide } from "vue";
import { useRouter } from "vue-router";
import InputText from "primevue/inputtext";
import MenuBar from "primevue/menubar";

import LoginModal from "@/components/LoginModal.vue";

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

    const playerName = ref("");
    const router = useRouter();
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

    return {
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
