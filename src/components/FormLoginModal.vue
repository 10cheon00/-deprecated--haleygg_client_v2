<template>
  <Dialog
    :modal="true"
    :visible="visible"
    :style="{ width: '50vh' }"
    @update:visible="closeModal()"
  >
    <template #header> Login </template>
    <form class="p-3" id="login-form" @submit.prevent="login()">
      <ValidationWrapper class="my-2" :errorObj="form.errorObj.id">
        <label class="form-label">ID</label>
        <InputText class="w-full" v-model="form.state.id" type="text" />
      </ValidationWrapper>

      <ValidationWrapper class="my-2" :errorObj="form.errorObj.password">
        <label class="form-label">Password</label>
        <InputText
          class="w-full"
          v-model="form.state.password"
          type="password"
        />
      </ValidationWrapper>
      <div v-if="isLoginFailed" class="mt-2 form-error">
        아이디나 비밀번호가 잘못되었습니다.
      </div>

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
import ValidationWrapper from "@/components/ValidationWrapper.vue";
import {
  validate,
  initializeErrorObj,
  Required,
  isErrorExists,
} from "@/utils/validator.js";

export default defineComponent({
  components: {
    Button,
    Dialog,
    InputText,
    ValidationWrapper,
  },
  setup() {
    const vuexStore = useStore();

    const visible = inject("isLoginButtonClicked");

    const isLoginFailed = ref(false);
    const rules = {
      id: Required,
      password: Required,
    };
    const state = {
      id: "",
      password: "",
    };

    const form = reactive({
      state: state,
      rules: rules,
      errorObj: initializeErrorObj(state, rules),
    });

    const closeModal = () => {
      visible.value = false;
    };

    const login = () => {
      validate(form);
      if (isErrorExists(form)) {
        return;
      }

      ServerApi.requestLogin(form.state.id, form.state.password)
        .then((response) => {
          vuexStore.commit("tokenStore/setAccessToken", response.data.access);
          vuexStore.commit("tokenStore/setRefreshToken", response.data.refresh);
          vuexStore.commit("tokenStore/setUserNameFromResponse", response);
          closeModal();
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == 401) {
            isLoginFailed.value = true;
          }
        });
    };

    return {
      form,
      isLoginFailed,
      visible,
      closeModal,
      login,
    };
  },
});
</script>

<style scoped>
.form-label {
  color: gray;
  font-size: smaller;
  font-weight: bold;
  margin-left: 0.5rem;
}
.form-error {
  font-size: smaller;
  color: rgb(255, 0, 0);
  background-color: rgb(255, 189, 189);
  padding: 0.75rem;
  border-radius: 3px;
}
</style>