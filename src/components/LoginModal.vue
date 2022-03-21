<template>
  <Dialog
    :modal="true"
    :visible="visible"
    :style="{ width: '50vh' }"
    @update:visible="closeModal()"
  >
    <template #header> Login </template>
    <form class="p-3" id="login-form" @submit.prevent="login()">
      <div class="my-2">
        <label class="m-3" id="form-label">ID</label>
        <InputText class="my-2 w-full" v-model="credential.id" type="text" />
      </div>
      <div>
        <ValidationErrorMessage :obj="v$.state.id" />
      </div>

      <div class="my-2">
        <label class="m-3" id="form-label">Password</label>
        <InputText
          class="my-2 w-full"
          v-model="credential.password"
          type="password"
        />
      </div>
      <div>
        <ValidationErrorMessage :obj="v$.state.password" />
      </div>
      <ValidationErrorMessage v-if="isLoginFailed" class="mt-2">
        아이디나 비밀번호가 잘못되었습니다.
      </ValidationErrorMessage>

      <Button class="w-full mt-2" type="submit" color="success">
        <div class="w-full">로그인</div>
      </Button>
    </form>
  </Dialog>
</template>

<script>
import { defineComponent, inject, ref, reactive } from "vue";
import { useStore } from "vuex";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";

import ServerApi from "@/api/server/module.js";
import { useValidator } from "@/utils/validator.js";
import ValidationErrorMessage from "@/components/ValidationErrorMessage.vue";

export default defineComponent({
  components: {
    Button,
    Dialog,
    InputText,
    ValidationErrorMessage,
  },
  setup() {
    const vuexStore = useStore();

    const visible = inject("isLoginButtonClicked");

    const isLoginFailed = ref(false);

    const credential = reactive({
      id: "",
      password: "",
    });

    const validationRules = {
      id: { required: true },
      password: { required: true },
    };

    const v$ = useValidator(credential, validationRules);

    const closeModal = () => {
      visible.value = false;
    };

    const login = () => {
      if (v$.isErrorExists() == false) {
        ServerApi.requestLogin(credential.id, credential.password)
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
              isLoginFailed.value = true;
            }
          });
      }
    };

    return {
      credential,
      isLoginFailed,
      visible,
      v$,
      closeModal,
      login,
    };
  },
});
</script>

<style scoped>
</style>