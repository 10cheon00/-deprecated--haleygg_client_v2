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

    <MatchFilter :disableTotalLeagueType="true" />

    <div class="container p-3">
      <Panel header="ELO 랭킹">
        <div
          v-if="top3Player"
          class="grid grid-nogutter text-center"
          id="top3-players"
        >
          <div v-if="top3Player[0]" class="col-12 elo-podium">
            <div class="text-4xl my-3">
              <span
                class="cursor-pointer"
                @click="routeToPlayerInformation(router, top3Player[0].name)"
              >
                🥇 {{ top3Player[0].name }}
              </span>
            </div>
            <div class="text-xl">Elo : {{ top3Player[0].current_elo }}</div>
          </div>
          <div v-if="top3Player[1]" class="col-12 sm:col-6 elo-podium">
            <div class="text-2xl my-3">
              <span
                class="cursor-pointer"
                @click="routeToPlayerInformation(router, top3Player[1].name)"
              >
                🥈 {{ top3Player[1].name }}
              </span>
            </div>
            <div class="text-md">Elo : {{ top3Player[1].current_elo }}</div>
          </div>
          <div v-if="top3Player[2]" class="col-12 sm:col-6 elo-podium">
            <div class="text-2xl my-3">
              <span
                class="cursor-pointer"
                @click="routeToPlayerInformation(router, top3Player[2].name)"
              >
                🥉 {{ top3Player[2].name }}
              </span>
            </div>
            <div class="text-md">Elo : {{ top3Player[2].current_elo }}</div>
          </div>
        </div>
        <NullDataBox v-else />
      </Panel>

      <!-- Elo rank table -->
      <table v-if="eloList" class="my-3" id="elo-rank-table">
        <colgroup>
          <col width="10%" />
          <col width="40%" />
          <col width="50%" />
        </colgroup>
        <tbody>
          <tr v-for="(row, index) in eloList" :key="index">
            <td>{{ index + 4 }}</td>
            <td>
              <span
                style="cursor: pointer"
                @click="routeToPlayerInformation(router, row.name)"
              >
                {{ row.name }} ( {{ row.favorate_race }} )
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

import MatchFilter from "@/components/MatchFilter.vue";
import NullDataBox from "@/components/NullDataBox.vue";
import PageHeader from "@/components/PageHeader.vue";
import Panel from "@/components/Panel.vue";
import PercentageBar from "@/components/PercentageBar.vue";
import ServerApi from "@/api/server/module.js";
import { useRouter } from "vue-router";

import { routeToPlayerInformation } from "@/utils/utils.js";

export default defineComponent({
  components: {
    MatchFilter,
    NullDataBox,
    PageHeader,
    PercentageBar,
    Panel,
  },
  setup() {
    const eloList = ref(null);
    const top3Player = ref(null);
    const leagueList = ref(null);
    const selectedLeagueType = ref("proleague");
    provide("selectedLeagueType", selectedLeagueType);
    const router = useRouter();

    onMounted(async () => {
      await fetchEloRanking();

      watch(selectedLeagueType, async () => {
        await fetchEloRanking();
      });
    });

    const fetchEloRanking = async () => {
      const response = await ServerApi.fetchEloRanking(
        selectedLeagueType.value
      );
      top3Player.value = undefined;
      top3Player.value = popTop3Player(response.data);

      const colorCode = [255, 105, 92];

      response.data.forEach((value, index, array) => {
        value.label = value.current_elo;
        value.percentage =
          Math.round((value.current_elo / array[0].current_elo) * 1000) / 10;
        colorCode[3] = value.color = [
          colorCode[0],
          colorCode[1],
          colorCode[2],
          0.3 + 1.05 ** -index,
        ];
      });
      eloList.value = response.data;
    };

    const popTop3Player = (data) => {
      if (data.length == 0) {
        return undefined;
      }
      const list = [];
      for (let i = 0; i < 3; ++i) {
        const value = data.shift();
        if (value !== undefined) {
          list.push(value);
        } else {
          break;
        }
      }
      return list;
    };

    return {
      eloList,
      leagueList,
      router,
      top3Player,
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

.elo-podium {
  padding: 1rem;
}

#top3-players .elo-podium:first-child {
  border-bottom: 1px #dee2e6 solid;
  border-right: none;
}

#top3-players .elo-podium {
  border-right: 1px #dee2e6 solid;
}

#top3-players .elo-podium:last-child {
  border-right: none;
}

@media (max-width: 576px) {
  #top3-players .elo-podium {
    border-bottom: 1px #dee2e6 solid;
    border-right: none;
  }
  #top3-players .elo-podium:last-child {
    border-bottom: none;
  }
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