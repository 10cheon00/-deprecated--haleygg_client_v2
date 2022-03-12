<template>
  <div class="app">
    <!-- Navigation bar -->
    <AppNavBar />

    <!-- Content -->
    <div id="content">
      <router-view :key="$route.fullPath" />
    </div>

    <!-- Footer -->
    <div class="container p-3 text-sm" id="footer">
      <p>할리클랜 전적검색기</p>
      <p>made by 10cheon00</p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import AppNavBar from "@/views/App/AppNavBar.vue";
import "@/css/responsive-layout.css";

export default defineComponent({
  name: "app",
  components: {
    AppNavBar,
  },
  setup() {},
});
</script>

<style scoped>
#content {
  background-color: white;
}
.app {
  min-height: 100vh;
  background-color: var(--surface-100);
  background-color: #ffdad6;
}
.footer {
  margin-left: auto;
  margin-right: auto;
}
</style>
