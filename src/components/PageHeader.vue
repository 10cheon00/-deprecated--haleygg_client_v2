<template>
  <div id="header" class="py-6">
    <div class="container px-8">
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

<style scoped>
#header {
  background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.8)
    ),
    url("https://i.imgur.com/SK3Kyyf.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: white;
}
</style>