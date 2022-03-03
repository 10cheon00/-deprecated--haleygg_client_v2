<template>
  <div>
    <!-- Explanation -->
    <div class="p-8 text-white" id="header">
      <p>Elo 산출 방식은 위키백과와 같습니다.</p>
      <br />
      <p class="text-xl font-bold">After = Before + K * (W - R)</p>
      <br />
      <div class="text-300">
        <p>- K(가중치) = 32</p>
        <p>- W(승리 여부) = 승리 시 1, 무승부 시 0.5, 패배 시 0</p>
        <p>- R = 승리할 확률</p>
      </div>
    </div>

    <div v-if="eloList" class="p-3">
      <StripePanel header="ELO Rank">
        <!-- Elo rank table -->
        <template #header-right>
          <DropDown
            v-model="selectedLeague"
            :options="leagueList"
            optionLabel="name"
            optionValue="id"
            @change="fetchEloRanking()"
          />
        </template>
        <table class="p-3" id="elo-rank-table">
          <colgroup>
            <col width="10%" />
            <col width="20%" />
            <col width="70%" />
          </colgroup>
          <thead>
            <tr>
              <th>순위</th>
              <th>유저</th>
              <th>Elo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in eloList" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ row.name }}</td>
              <td class="pr-1">
                <PercentageBar id="eloBar" :data="row" />
              </td>
            </tr>
          </tbody>
        </table>
      </StripePanel>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import DropDown from "primevue/dropdown";

import ServerApi from "@/apis/server-api.js";
import PercentageBar from "@/components/PercentageBar.vue";
import StripePanel from "@/components/StripePanel.vue";

export default defineComponent({
  components: {
    DropDown,
    PercentageBar,
    StripePanel,
  },
  setup() {
    const eloList = ref(null);
    const leagueList = ref(null);
    const selectedLeague = ref(null);

    onMounted(async () => {
      // fetch elo list.
      const response = await ServerApi.fetchLeagueList();
      leagueList.value = response.data;
      selectedLeague.value = leagueList.value[0].id;
      await fetchEloRanking();
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
      console.log(eloList.value);
    };

    return {
      eloList,
      leagueList,
      selectedLeague,
      fetchEloRanking,
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
  width: 100%;
  min-height: 194px;
}

#elo-rank-table {
  text-align: center;
  width: 100%;
}

td,
th {
  border-collapse: collapse;
  border: 1px solid #dee2e6;
  border-right: none;
  border-left: none;
  vertical-align: middle;
}

th {
  background-color: #c8c8c8;
  border-top: none;
  height: 3rem;
  font-weight: bold;
  vertical-align: middle;
}

td {
  height: 2rem;
  vertical-align: middle;
}

tr:last-child td {
  border-bottom: none;
}

tbody tr:first-child td {
  border-top: none;
}
</style>