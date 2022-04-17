<template>
  <div>
    <PageHeader>
      <div class="text-center">
        <p class="my-4 text-4xl font-bold">Haleygg.kr</p>
        <PlayerSearchBar id="search-bar" :size="1.25" />
      </div>
    </PageHeader>

    <div class="container p-3">
      <div id="info">
        <p class="p-1">
          카페에 가입하신 닉네임을 검색하시면 자신의 전적을 확인할 수 있습니다.
        </p>
        <p class="p-1">
          현재 개발하고 있는 중입니다... 조금만 더 기다려주세요.
        </p>
      </div>
    </div>
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

#info {
  text-align: center;
  padding: 4rem 0;
}

#search-bar {
  width: 75%;
  margin-left: auto;
  margin-right: auto;
}
</style>
