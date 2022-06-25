<template>
  <div>
    <slot></slot>
    <ValidationErrorMessage class="my-2" :message="errorObj.message" />
  </div>
</template>
<script>
import { defineComponent } from "vue";

import ValidationErrorMessage from "@/components/ValidationErrorMessage.vue";

export default defineComponent({
  components: {
    ValidationErrorMessage,
  },
  props: {
    errorObj: {
      type: Object,
      required: true,
      default: () => {
        return {
          hasError: false,
          message: "",
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
</style>