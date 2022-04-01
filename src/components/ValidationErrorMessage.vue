<template>
  <div v-if="message" class="error-message">
    {{ message }}
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  setup() {},
});
</script>
<style scoped>
.error-message {
  font-size: smaller;
  color: rgb(255, 0, 0);
  background-color: rgb(255, 189, 189);
  padding: 0.75rem;
  border-radius: 3px;
}
</style>