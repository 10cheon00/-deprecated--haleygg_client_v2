<template>
  <div>
    <PageHeader>
      <div class="text-center">
        <p class="text-4xl font-bold">Haley.gg</p>
        <PlayerSearchBar class="py-8" id="search-bar" :size="1.25" />
      </div>
    </PageHeader>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import PageHeader from "@/components/PageHeader.vue";

import PlayerSearchBar from "@/components/PlayerSearchBar.vue";

export default defineComponent({
  components: {
    PageHeader,
    PlayerSearchBar,
  },
  setup() {
    return {};
  },
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
#search-bar {
  width: 32rem;
  margin-left: auto;
  margin-right: auto;
}
</style>
