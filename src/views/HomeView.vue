<template>
  <div>
    <PageHeader>
      <div class="text-center">
        <p class="my-4 text-4xl font-bold">Haleygg.kr</p>
        <PlayerSearchBar class="p-fluid" id="search-bar" :size="1.25" />
      </div>
    </PageHeader>

    <div class="container p-3">
      <div id="information">
        <p>할리 클랜의 공식전 전적을 조회할 수 있는 사이트입니다.</p>
        <p>닉네임을 검색하시면 관련된 전적과 통계를 볼 수 있습니다.</p>
      </div>
      <div class="grid grid-nogutter">
        <PlayerRankBoard
          v-if="totalMatchCountRank"
          class="col-12 md:col-6 pr-0 md:pr-2 pb-2 md:pb-0"
          :rankSheet="totalMatchCountRank"
          title="통합 다전 순위 ⚔️"
          unit="경기"
        />
        <PlayerRankBoard
          v-if="totalWinCountRank"
          class="col-12 md:col-6 pl-0 md:pl-2"
          :rankSheet="totalWinCountRank"
          title="통합 다승 순위 ✌️"
          unit="승"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";

import PageHeader from "@/components/PageHeader.vue";
import PlayerSearchBar from "@/components/PlayerSearchBar.vue";
import PlayerRankBoard from "@/components/PlayerRankBoard.vue";
import ServerApi from "@/api/server/module.js";

export default defineComponent({
  components: {
    PageHeader,
    PlayerRankBoard,
    PlayerSearchBar,
  },
  setup() {
    const totalMatchCountRank = ref(null);
    const totalWinCountRank = ref(null);

    const fetchRank = async () => {
      let response = await ServerApi.fetchTotalMatchCountRank();
      totalMatchCountRank.value = response.data.results;

      response = await ServerApi.fetchTotalWinCountRank();
      totalWinCountRank.value = response.data.results;
    };

    onMounted(() => {
      fetchRank();
    });

    return {
      totalMatchCountRank,
      totalWinCountRank,
    };
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

#information {
  border-bottom: 1px solid #dee2e6;
  margin-bottom: 1rem;
  padding: 4rem 0;
  text-align: center;
}

#search-bar {
  width: 75%;
  margin-left: auto;
  margin-right: auto;
}
</style>
