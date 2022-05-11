<template>
  <div>
    <PageHeader>
      <p class="text-4xl m-4 font-bold">프로리그 통계</p>
      <p class="text-300">경기타입별로 다전/다승/다패 순위를 보여드립니다.</p>
    </PageHeader>
    <div class="container p-3">
      <div class="flex align-items-center mb-3">
        <label class="flex-none pr-2">리그</label>
        <DropDown
          v-if="leagueList"
          v-model="selectedLeague"
          :options="leagueList"
          optionLabel="name"
          optionValue="name"
          class="flex flex-grow-1"
          @change="fetchRankSheet()"
        />
      </div>

      <!-- Divider -->
      <div class="my-3 divider" />

      <div v-if="rankSheet.isFetched" class="grid grid-nogutter w-full">
        <PlayerRankBoard
          class="col-12 md:col-4 md:pr-2 mb-3"
          :rankSheet="rankSheet.totalMatchCount"
          title="통합 다전 랭킹 ⚔️"
          unit="경기"
        />
        <PlayerRankBoard
          class="col-12 md:col-4 md:px-1 mb-3"
          :rankSheet="rankSheet.totalWinCount"
          title="통합 다승 랭킹 ✌️"
          unit="승"
        />
        <PlayerRankBoard
          class="col-12 md:col-4 md:pl-2 mb-3"
          :rankSheet="rankSheet.totalLoseCount"
          title="통합 다패 랭킹 😥"
          unit="패"
        />

        <!-- Divider -->
        <div class="col-12 mb-3 divider" />

        <PlayerRankBoard
          class="col-12 md:col-4 md:pr-2 mb-3"
          :rankSheet="rankSheet.meleeMatchCount"
          title="개인전 다전 랭킹 ⚔️"
          unit="경기"
        />
        <PlayerRankBoard
          class="col-12 md:col-4 md:px-1 mb-3"
          :rankSheet="rankSheet.meleeWinCount"
          title="개인전 다승 랭킹 ✌️"
          unit="승"
        />
        <PlayerRankBoard
          class="col-12 md:col-4 md:pl-2 mb-3"
          :rankSheet="rankSheet.meleeLoseCount"
          title="개인전 다패 랭킹 😥"
          unit="패"
        />

        <!-- Divider -->
        <div class="col-12 mb-3 divider" />

        <PlayerRankBoard
          class="col-12 md:col-4 md:pr-2 mb-3"
          :rankSheet="rankSheet.topAndBottomMatchCount"
          title="팀전 다전 랭킹 ⚔️"
          unit="경기"
        />
        <PlayerRankBoard
          class="col-12 md:col-4 md:px-1 mb-3"
          :rankSheet="rankSheet.topAndBottomWinCount"
          title="팀전 다승 랭킹 ✌️"
          unit="승"
        />
        <PlayerRankBoard
          class="col-12 md:col-4 md:pl-2 mb-3"
          :rankSheet="rankSheet.topAndBottomLoseCount"
          title="팀전 다패 랭킹 😥"
          unit="패"
        />
      </div>
      <div
        v-else
        class="flex justify-content-center align-items-center"
        style="height: 200px"
      >
        <ProgressSpinner strokeWidth="1" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted, ref } from "vue";
import DropDown from "primevue/dropdown";
import ProgressSpinner from "primevue/progressspinner";

import PageHeader from "@/components/PageHeader.vue";
import PlayerRankBoard from "@/components/PlayerRankBoard.vue";
import ServerApi from "@/api/server/module.js";

export default defineComponent({
  components: {
    DropDown,
    PageHeader,
    PlayerRankBoard,
    ProgressSpinner,
  },
  setup() {
    const leagueList = ref([]);
    const selectedLeague = ref("Total");
    const rankSheet = reactive({ isFetched: false });

    const fetchRankSheet = async () => {
      rankSheet.isFetched = false;
      // Fetch total match/win/lose count rank.
      let response = await ServerApi.fetchTotalMatchCountRank(
        undefined,
        selectedLeague.value,
        undefined
      );
      rankSheet.totalMatchCount = response.data.results;

      response = await ServerApi.fetchTotalWinCountRank(
        undefined,
        selectedLeague.value,
        undefined
      );
      rankSheet.totalWinCount = response.data.results;

      response = await ServerApi.fetchTotalLoseCountRank(
        undefined,
        selectedLeague.value,
        undefined
      );
      rankSheet.totalLoseCount = response.data.results;

      // Fetch melee match/win/lose count rank.
      response = await ServerApi.fetchMeleeMatchCountRank(
        undefined,
        selectedLeague.value,
        undefined
      );
      rankSheet.meleeMatchCount = response.data.results;

      response = await ServerApi.fetchMeleeWinCountRank(
        undefined,
        selectedLeague.value,
        undefined
      );
      rankSheet.meleeWinCount = response.data.results;

      response = await ServerApi.fetchMeleeLoseCountRank(
        undefined,
        selectedLeague.value,
        undefined
      );
      rankSheet.meleeLoseCount = response.data.results;

      // Fetch top-and-bottom match/win/lose count rank.
      response = await ServerApi.fetchTopAndBottomMatchCountRank(
        undefined,
        selectedLeague.value,
        undefined
      );
      rankSheet.topAndBottomMatchCount = response.data.results;

      response = await ServerApi.fetchTopAndBottomWinCountRank(
        undefined,
        selectedLeague.value,
        undefined
      );
      rankSheet.topAndBottomWinCount = response.data.results;

      response = await ServerApi.fetchTopAndBottomLoseCountRank(
        undefined,
        selectedLeague.value,
        undefined
      );
      rankSheet.topAndBottomLoseCount = response.data.results;

      rankSheet.isFetched = true;
    };

    onMounted(async () => {
      const response = await ServerApi.fetchLeagueList();
      leagueList.value = response.data.filter((item) => {
        return item.type == "proleague";
      });
      leagueList.value.unshift({
        id: undefined,
        name: "Total",
        type: undefined,
      });
      fetchRankSheet();
    });

    return {
      leagueList,
      rankSheet,
      selectedLeague,
      fetchRankSheet,
    };
  },
});
</script>

<style scoped>
.divider {
  background-color: #dee2e6;
  height: 1px;
}
</style>