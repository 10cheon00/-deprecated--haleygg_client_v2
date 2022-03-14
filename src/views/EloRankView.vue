<template>
  <div>
    <!-- Explanation -->
    <PageHeader>
      <p class="text-4xl m-4 font-bold">Elo 랭킹</p>
      <p>Elo 산출 방식은 위키백과와 같습니다.</p>
      <p class="text-xl font-bold">After = Before + K * (W - R)</p>
      <br />
      <div class="text-300">
        <p>K<small class="text-xs">(=가중치)</small> 기본값 32</p>
        <p>
          W<small class="text-xs">(=승리여부)</small> 승리 시 1, 무승부 시 0.5,
          패배 시 0
        </p>
        <p>R<small class="text-xs">(=승리할 확률)</small></p>
      </div>
    </PageHeader>

    <div v-if="eloList" class="container p-3">
      <Panel header="ELO Rank" />

      <LeagueSelector :leagueList="leagueList" />

      <!-- Elo rank table -->
      <table class="p-3" id="elo-rank-table">
        <colgroup>
          <col width="10%" />
          <col width="20%" />
          <col width="70%" />
        </colgroup>
        <tbody>
          <tr v-for="(row, index) in eloList" :key="index">
            <td>{{ index + 1 }}</td>
            <td>
              <span
                style="cursor: pointer"
                @click="routeToPlayerInformation(router, row.name)"
              >
                {{ row.name }}
              </span>
            </td>
            <td class="pr-1">
              <PercentageBar id="eloBar" :data="row" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, provide, watch } from "vue";

import LeagueSelector from "@/components/LeagueSelector.vue";
import PageHeader from "@/components/PageHeader.vue";
import PercentageBar from "@/components/PercentageBar.vue";
import ServerApi from "@/api/server/module.js";
import Panel from "@/components/Panel.vue";
import { useRouter } from "vue-router";

import { routeToPlayerInformation } from "@/utils/utils.js";

export default defineComponent({
  components: {
    LeagueSelector,
    PageHeader,
    PercentageBar,
    Panel,
  },
  setup() {
    const eloList = ref(null);
    const leagueList = ref(null);
    const selectedLeague = ref(null);
    provide("selectedLeague", selectedLeague);
    const router = useRouter();

    onMounted(async () => {
      // fetch elo list.
      const response = await ServerApi.fetchEloRatingActiveLeagueList();
      leagueList.value = response.data;
      selectedLeague.value = leagueList.value[0].id;
      await fetchEloRanking();

      watch(selectedLeague, async () => {
        await fetchEloRanking();
      });
    });

    const fetchEloRanking = async () => {
      const response = await ServerApi.fetchEloRanking(selectedLeague.value);

      const colorCodeStart = [0, 6, 36];
      const colorCodeEnd = [74, 201, 227];

      response.data.forEach((value, index, array) => {
        value.value = value.current_elo;
        value.percentage = value.current_elo / array[0].current_elo;
        value.color = [
          Math.floor(
            colorCodeStart[0] +
              value.percentage * (colorCodeEnd[0] - colorCodeStart[0])
          ),
          Math.floor(
            colorCodeStart[1] +
              value.percentage * (colorCodeEnd[1] - colorCodeStart[1])
          ),
          Math.floor(
            colorCodeStart[2] +
              value.percentage * (colorCodeEnd[2] - colorCodeStart[2])
          ),
        ];
      });
      eloList.value = response.data;
    };

    return {
      eloList,
      leagueList,
      selectedLeague,
      router,
      fetchEloRanking,
      routeToPlayerInformation,
    };
  },
});
</script>

<style scoped>
#elo-rank-table {
  text-align: center;
  width: 100%;
}

td {
  border-collapse: collapse;
  border: 1px solid #dee2e6;
  border-right: none;
  border-left: none;
  vertical-align: middle;
}

tr td:first-child {
  border-left: 1px solid #dee2e6;
}

tr td:last-child {
  border-right: 1px solid #dee2e6;
}

td {
  height: 2rem;
  vertical-align: middle;
}
</style>