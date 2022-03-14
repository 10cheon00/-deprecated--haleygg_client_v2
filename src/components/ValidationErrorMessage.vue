<template>
  <div>
    <div
      v-if="obj && obj.isError && obj.isTouched"
      class="mt-2"
      id="form-error"
    >
      {{ obj.errorMessage }}
    </div>
    <div v-if="hasSlot()">
      <div id="form-error">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    obj: Object,
  },
  setup(props, context) {
    const hasSlot = () => {
      return !!context.slots.default;
    };
    return {
      hasSlot,
    };
  },
});
</script>

<style scoped>
#form-error {
  font-size: smaller;
  color: rgb(255, 0, 0);
  background-color: rgb(255, 189, 189);
  padding: 0.75rem;
  border-radius: 3px;
}
</style>