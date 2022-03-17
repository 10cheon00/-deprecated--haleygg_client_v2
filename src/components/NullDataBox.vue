<template>
  <div id="null-data-box">데이터가 없습니다.</div>
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
#null-data-box {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: var(--surface-300);
}
</style>
