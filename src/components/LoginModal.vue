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
      <Button class="w-full" type="submit" color="success">
        <div class="w-full">로그인</div>
      </Button>
    </form>
  </Dialog>
</template>

<script>
import { defineComponent, inject, ref } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";

export default defineComponent({
  components: {
    Button,
    Dialog,
    InputText,
  },
  setup() {
    const id = ref("");
    const password = ref("");
    const visible = inject("isLoginButtonClicked");

    const closeModal = () => {
      visible.value = false;
    };
    const login = () => {
      if (id.value.length > 0 && password.value.length > 0) alert("fasdf");
    };
    return {
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