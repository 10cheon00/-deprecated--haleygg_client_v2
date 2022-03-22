<template>
  <div class="container p-6">
    권한이 없습니다. 잠시 후 홈페이지로 이동합니다.
  </div>
</template>
<script>
import { defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();

    onMounted(() => {
      setTimeout(() => {
        router.push({ name: "HomeView" });
      }, 1000);
    });
  },
});
</script>
