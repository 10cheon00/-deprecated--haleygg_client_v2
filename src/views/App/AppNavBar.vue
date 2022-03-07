<template>
  <MenuBar class="tabmenu" :model="items">
    <template #start>
      <Button
        class="p-button-text p-button-secondary text-4xl mr-4"
        label="Haley.GG"
        @click="routeToHome()"
      />
    </template>
    <template #end>
      <div class="flex align-items-center">
        <!-- login status -->
        <div class="pr-3">
          <div v-if="userName.length > 0" class="flex align-items-center">
            <span>{{ userName }}</span>
            <Button
              class="ml-3"
              id="credential-button"
              icon="pi pi-sign-out"
              @click="logoutButtonClicked()"
            />
          </div>
          <Button
            v-else
            icon="pi pi-cog"
            id="credential-button"
            @click="loginButtonClicked()"
          />
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
import { defineComponent, ref, provide, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import MenuBar from "primevue/menubar";

import LoginModal from "@/components/LoginModal.vue";

export default defineComponent({
  components: {
    Button,
    InputText,
    LoginModal,
    MenuBar,
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
    };

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

    const userName = computed(() => {
      return vuexStore.getters["tokenStore/getUserName"];
    });

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
      userName,
      search,
      routeToHome,
      loginButtonClicked,
      logoutButtonClicked,
    };
  },
});
</script>

<style scoped>
#credential-button {
  background-color: #dd0ea6;
  border-color: #dd0ea6;
  border-radius: 50%;
}
.p-menubar {
  background: linear-gradient(120deg, #fea29a, #fe62d4);
  border: none;
  border-radius: 0px;
}
</style>
