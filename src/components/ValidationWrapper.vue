<template>
  <div>
    <slot></slot>
    <div v-if="errorObj.isErrorExists" class="my-2 error-message">
      {{ errorObj.errorMessage }}
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    errorObj: {
      type: Object,
      required: true,
      default: () => {
        return {
          isErrorExists: false,
          errorMessage: "",
        };
      },
    },
  },
  setup() {},
});
</script>
<style scoped>
.form-label {
  color: gray;
  font-size: smaller;
  font-weight: bold;
  margin-left: 0.5rem;
}
.error-message {
  font-size: smaller;
  color: rgb(255, 0, 0);
  background-color: rgb(255, 189, 189);
  padding: 0.75rem;
  border-radius: 3px;
}
</style>