<template>
  <div id="header" class="py-6">
    <div class="container p-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>