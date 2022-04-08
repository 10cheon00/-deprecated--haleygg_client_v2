<template>
  <div class="p-6" id="header">
    <div class="container">
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
  display: flex;
  align-items: center;
  min-height: 20rem;
}
</style>