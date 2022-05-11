<template>
  <div class="app">
    <!-- Navigation bar -->
    <AppNavBar />

    <!-- Content -->
    <div id="content">
      <router-view :key="$route.fullPath" />
    </div>

    <!-- Footer -->
    <div class="container flex justify-content-between p-3 text-sm" id="footer">
      <div>
        <p>Haley 클랜 전적검색기</p>
        <p>Made by mAziciAn</p>
        <p>0.3.2</p>
      </div>
      <div></div>
      <div>
        <div>
          <a href="https://cafe.naver.com/ophaley/">Haley 클랜 네이버 카페 </a>
          <img
            src="https://ca-fe.pstatic.net/web-section/favicon.ico"
            id="cafe-icon"
          />
        </div>
        <div>
          <a href="https://github.com/10cheon00/haleygg_client">
            Github page <i class="pi pi-github" />
          </a>
        </div>
      </div>
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
#cafe-icon {
  width: 1rem;
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
