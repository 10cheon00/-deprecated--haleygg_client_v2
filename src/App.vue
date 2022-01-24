<template>
  <div class="app">
    <!-- Navigation bar -->
    <AppNavBar/>

    <!-- Content -->
    <div class="layout">
      <div class="content">
        <router-view/>
      </div>
    </div>
  </div>  
</template>

<script>
import { defineComponent } from 'vue'
import AppNavBar from './views/App/AppNavBar.vue';

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
  min-height:1080px;
  background-color: var(--green-900);
}
.content{
  background-color: white;
}
</style>
