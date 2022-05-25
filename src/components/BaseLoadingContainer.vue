<template>
  <div v-if="isLoaded">
    <slot></slot>
  </div>
  <div
    v-else
    class="flex justify-content-center align-items-center"
    style="height: 50vh"
  >
    <ProgressSpinner strokeWidth="1" />
  </div>
</template>
<script>
import { defineComponent } from "vue";
import ProgressSpinner from "primevue/progressspinner";

export default defineComponent({
  components: {
    ProgressSpinner,
  },
  props: {
    isLoaded: {
      type: Boolean,
      required: true,
    },
  },
  setup() {},
});
</script>
