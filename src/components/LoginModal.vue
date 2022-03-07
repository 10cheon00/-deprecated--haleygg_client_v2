<template>
  <Dialog :modal="true" :visible="visible" @update:visible="closeModal()">
    <template #header> Login </template>
    <form class="p-3" id="login-form" @submit.prevent="login()">
      <div class="flex align-items-center my-2">
        <label class="mx-3" id="form-label">ID</label>
        <InputText class="w-full" v-model="id" type="text" />
      </div>
      <div class="flex align-items-center my-2">
        <label class="mx-3" id="form-label">Password</label>
        <InputText class="w-full" v-model="password" type="password" />
      </div>
      {{ error_message }}
      <Button class="w-full" type="submit" color="success">
        <div class="w-full">로그인</div>
      </Button>
    </form>
  </Dialog>
</template>

<script>
import { defineComponent, inject, ref } from "vue";
import { useStore } from "vuex";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";

import ServerApi from "@/api/server/module.js";

export default defineComponent({
  components: {
    Button,
    Dialog,
    InputText,
  },
  setup() {
    const visible = inject("isLoginButtonClicked");

    const id = ref("");
    const password = ref("");
    const error_message = ref("");
    const vuexStore = useStore();

    const closeModal = () => {
      visible.value = false;
    };

    const login = () => {
      if (id.value.length > 0 && password.value.length > 0) {
        ServerApi.requestLogin(id.value, password.value)
          .then((response) => {
            vuexStore.commit("tokenStore/setAccessToken", response.data.access);
            vuexStore.commit(
              "tokenStore/setRefreshToken",
              response.data.refresh
            );
            vuexStore.commit("tokenStore/setUserNameFromResponse", response);
            closeModal();
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status == 401) {
              error_message.value = "아이디나 비밀번호가 잘못 입력되었습니다.";
            }
          });
      }
    };

    return {
      error_message,
      id,
      password,
      visible,
      closeModal,
      login,
    };
  },
});
</script>
<style scoped>
#login-form {
  min-width: 32rem;
}
#form-label {
  min-width: 8rem;
}
</style>