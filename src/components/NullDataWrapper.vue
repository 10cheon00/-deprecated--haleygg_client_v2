<template>
  <div id="null-data-wrapper">
    <slot v-if="condition"></slot>
    <div v-else id="null-data">데이터가 없습니다.</div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    condition: {
      type: Boolean,
      required: true,
    },
  },
  setup() {},
});
</script>

<style scoped>
#null-data-wrapper {
  width: 100%;
  height: 100%;
  min-height: 5rem;
}
#null-data {
  width: 100%;
  text-align: center;
  align-self: center;
}
</style>
