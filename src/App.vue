<template>
  <div class="app">
    <!-- Navigation bar -->
    <AppNavBar/>

    <div class="flex justify-content-center" id="layout">
      <!-- Content -->
      <div class="content">
        <router-view/>
      </div>
    </div>
    <!-- Footer -->
    <div class="footer flex justify-content-center mt-3">
      footer
    </div>
  </div>  
</template>

<script>
import { defineComponent } from 'vue'
import AppNavBar from '@/views/App/AppNavBar.vue';

export default defineComponent({
  name: "app",
  components: {
    AppNavBar,
  },
  setup(){
    
  }
});
</script>

<style scoped>
.title{
  min-height:100px;
}
.app{
  min-height:1000px;
  background-color: var(--surface-600);
}
.content{
  background-color: white;
}
</style>
