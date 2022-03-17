<template>
  <div v-if="playerInformation.isFetched">
    <!-- Profile -->
    <PageHeader
      :style="{
        width: '100%',
        'background-attachment': 'fixed',
        'background-image': `linear-gradient(90deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),
                      url('${playerInformation.profile.favorate_race_wallpaperUrl}')`,
        'background-position': 'center',
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
      }"
    >
      <div class="text-4xl font-bold mb-3" id="player-name">
        {{ playerInformation.profile.name }}
      </div>
      <small class="text-sm" id="signup-date"
        >{{ playerInformation.profile.joined_date }} 가입</small
      >
    </PageHeader>

    <div class="container">
      <div class="grid grid-nogutter p-3">
        <!-- Career -->
        <div class="col-12">
          <Panel
            header="Career"
            :stripeColor="playerInformation.profile.favorate_race"
          >
            <div class="p-3">{{ playerInformation.profile.career }}</div>
          </Panel>
        </div>

        <!-- League selector -->
        <LeagueSelector class="col-12 my-2" :leagueList="leagueList" />

        <div class="col-12 grid grid-nogutter">
          <!-- Statistics -->
          <div class="col-12 md:col-4 pr-0 md:pr-2 pb-2 md:pb-0">
            <Panel
              header="Statistics"
              :stripeColor="playerInformation.favorate_race"
            >
              <div
                v-for="(item, index) in playerInformation.statistics"
                :key="index"
                class="grid grid-nogutter p-2"
                id="content-item"
              >
                <div class="col-6">{{ item.label }}</div>
                <div
                  class="col-4 text-right"
                  style="
                    border-right: dashed 1px lightgray;
                    padding-right: 10px;
                  "
                >
                  {{ item.value }}
                </div>
                <div class="col-2 text-right" style="color: gray">
                  {{ item.percentage }}
                </div>
              </div>
            </Panel>
          </div>

          <!-- Elo chart -->
          <div class="col-12 md:col-8">
            <Panel
              header="Elo Chart"
              :stripeColor="playerInformation.favorate_race"
            >
              <div id="elo-chart">
                <Chart
                  v-if="playerInformation.eloChartData"
                  type="line"
                  :data="playerInformation.eloChartData"
                  :options="playerInformation.eloChartOptions"
                />
                <NullDataBox v-else class="p-chart" />
              </div>
            </Panel>
          </div>
        </div>

        <!-- List of Matches -->
        <div class="col-12 pt-2" id="match-result-list">
          <Panel
            class="pb-1"
            header="Recent Matches"
            :stripeColor="playerInformation.favorate_race"
          >
            <template #panel-header-right>
              <CheckBox
                name="밀리 전적"
                v-model="isMeleeMatchResultShown"
                :binary="true"
              />
              <label class="ml-1 mr-3">밀리</label>
              <CheckBox
                name="팀플 전적"
                v-model="isTopAndBottomMatchResultShown"
                :binary="true"
              />
              <label class="ml-1">팀플</label>
            </template>
          </Panel>

          <MatchResultList
            :matchResultList="matchResultList"
            :resultListOwnerName="playerName"
          />
          <div
            v-if="nextURL"
            class="
              flex
              align-items-center
              justify-content-center
              w-full
              text-center
              mt-1
            "
            style="height: 5rem; background-color: #fee2e6; color: gray"
            @click="fetchPlayerNextMatches()"
          >
            <i class="pi pi-refresh"></i>&nbsp;더 보기
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, computed, onMounted, watch, provide } from "vue";
import Chart from "primevue/chart";
import CheckBox from "primevue/checkbox";

import LeagueSelector from "@/components/LeagueSelector.vue";
import MatchResultList from "@/components/MatchResultList.vue";
import NullDataBox from "@/components/NullDataBox.vue";
import PageHeader from "@/components/PageHeader.vue";
import ServerApi from "@/api/server/module.js";
import Panel from "@/components/Panel.vue";

export default defineComponent({
  components: {
    Chart,
    CheckBox,
    LeagueSelector,
    MatchResultList,
    NullDataBox,
    PageHeader,
    Panel,
  },
  props: {
    playerName: {
      required: true,
      type: String,
    },
  },
  setup(props) {
    const player = ref(null);
    const playerInformation = ref({ isFetched: false });
    const rawMatchResultList = ref([]);
    const nextURL = ref(null);

    const isMeleeMatchResultShown = ref(true);
    const isTopAndBottomMatchResultShown = ref(true);

    const leagueList = ref(null);
    const selectedLeague = ref(null);
    provide("selectedLeague", selectedLeague);

    const raceWallpaperUrls = {
      P: "https://bnetcmsus-a.akamaihd.net/cms/gallery/7EKSWN98V7M91498587613057.jpg",
      T: "https://bnetcmsus-a.akamaihd.net/cms/gallery/lt/LTHPT2MPAS8P1502725038501.jpg",
      Z: "https://bnetcmsus-a.akamaihd.net/cms/gallery/JHXVBPP04GHH1498587636883.jpg",
    };

    onMounted(async () => {
      // Fetch profile.
      let response = await ServerApi.fetchPlayerDetail(props.playerName);
      playerInformation.value.profile = response.data;
      player.value = response.data;

      playerInformation.value.profile.favorate_race_wallpaperUrl =
        raceWallpaperUrls[player.value.favorate_race];

      // Fetch leagueList first to request only for specific league.
      response = await ServerApi.fetchLeagueList();
      leagueList.value = response.data;
      leagueList.value.push({
        id: undefined,
        name: "Total",
      });
      selectedLeague.value = leagueList.value[0].id;

      // Fetch statistics and Elo and matches
      await fetchPlayerStatisticsRelatedWithLeague();

      watch(selectedLeague, async () => {
        await fetchPlayerStatisticsRelatedWithLeague();
      });

      playerInformation.value.isFetched = true;
    });

    const matchResultList = computed(() => {
      return rawMatchResultList.value.filter((matchResult) => {
        const matchType =
          matchResult.player_tuples.length > 1 ? "topAndBottom" : "melee";
        if (
          matchType == "topAndBottom" &&
          isTopAndBottomMatchResultShown.value
        ) {
          return true;
        }
        if (matchType == "melee" && isMeleeMatchResultShown.value) {
          return true;
        }
        return false;
      });
    });

    const aggregateStatistics = (data) => {
      const percentage = (winning_count, losing_count) => {
        if (losing_count + winning_count <= 0) {
          return 0.0;
        }

        return (
          Math.round((winning_count / (winning_count + losing_count)) * 1000) /
          10
        );
      };

      const list = [
        {
          label: "개인",
          value: `${data.winning_melee_matches_count}-${data.losing_melee_matches_count}`,
          percentage: `${percentage(
            data.winning_melee_matches_count,
            data.losing_melee_matches_count
          )}%`,
        },
        {
          label: "팀플",
          value: `${data.winning_top_and_bottom_matches_count}-${data.losing_top_and_bottom_matches_count}`,
          percentage: `${percentage(
            data.winning_top_and_bottom_matches_count,
            data.losing_top_and_bottom_matches_count
          )}%`,
        },
        {
          label: "프로토스 vs 테란",
          value: `${data.protoss_wins_to_terran_count}-${data.protoss_loses_to_terran_count}`,
          percentage: `${percentage(
            data.protoss_wins_to_terran_count,
            data.protoss_loses_to_terran_count
          )}%`,
        },
        {
          label: "프로토스 vs 저그",
          value: `${data.protoss_wins_to_zerg_count}-${data.protoss_loses_to_zerg_count}`,
          percentage: `${percentage(
            data.protoss_wins_to_zerg_count,
            data.protoss_loses_to_zerg_count
          )}%`,
        },
        {
          label: "테란 vs 프로토스",
          value: `${data.terran_wins_to_protoss_count}-${data.terran_loses_to_protoss_count}`,
          percentage: `${percentage(
            data.terran_wins_to_protoss_count,
            data.terran_loses_to_protoss_count
          )}%`,
        },
        {
          label: "테란 vs 저그",
          value: `${data.terran_wins_to_zerg_count}-${data.terran_loses_to_zerg_count}`,
          percentage: `${percentage(
            data.terran_wins_to_zerg_count,
            data.terran_loses_to_zerg_count
          )}%`,
        },
        {
          label: "저그 vs 프로토스",
          value: `${data.zerg_wins_to_protoss_count}-${data.zerg_loses_to_protoss_count}`,
          percentage: `${percentage(
            data.zerg_wins_to_protoss_count,
            data.zerg_loses_to_protoss_count
          )}%`,
        },
        {
          label: "저그 vs 테란",
          value: `${data.zerg_wins_to_terran_count}-${data.zerg_loses_to_terran_count}`,
          percentage: `${percentage(
            data.zerg_wins_to_terran_count,
            data.zerg_loses_to_terran_count
          )}%`,
        },
      ];

      return list;
    };

    const addMatchResultsToList = (data) => {
      rawMatchResultList.value = rawMatchResultList.value.concat(data.results);
      nextURL.value = data.next;
    };

    const fetchPlayerNextMatches = async () => {
      if (nextURL.value) {
        const url = "api" + nextURL.value.match(/(?<=api).+/);
        const response = await ServerApi.fetchPlayerNextMatches(url);
        addMatchResultsToList(response.data);
      }
    };

    const fetchPlayerStatisticsRelatedWithLeague = async () => {
      // Fetch statistics
      let response = await ServerApi.fetchPlayerStatistics(
        player.value.id,
        selectedLeague.value
      );

      playerInformation.value.statistics = aggregateStatistics(response.data);

      // Fetch matches
      response = await ServerApi.fetchPlayerMatches(
        player.value.id,
        selectedLeague.value
      );
      rawMatchResultList.value = [];
      addMatchResultsToList(response.data);

      // Fetch elo history
      response = await ServerApi.fetchPlayerEloHistory(
        player.value.id,
        selectedLeague.value
      );

      // manage chart options
      if (response.data.length == 0) {
        playerInformation.value.eloList = null;
        playerInformation.value.eloChartData = null;
        playerInformation.value.eloChartOptions = null;
        return;
      }
      playerInformation.value.eloList = response.data;

      playerInformation.value.eloChartData = {
        datasets: [
          {
            data: playerInformation.value.eloList,
            pointBackgroundColor: "#546e71",
            pointBorderColor: "#222c31",
          },
        ],
      };

      playerInformation.value.eloChartOptions = {
        animation: false,
        maintainAspectRatio: false,
        parsing: {
          xAxisKey: "date",
          yAxisKey: "elo",
        },
        plugins: {
          datalabels: {
            anchor: "end",
            align: "top",
            backgroundColor: "#222c31",
            clamp: true,
            color: "white",
            borderRadius: "5",
            formatter: (value) => {
              return value.elo;
            },
          },
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            suggestedMin:
              parseFloat(
                playerInformation.value.eloList.reduce((previous, current) => {
                  return parseFloat(previous.elo) < parseFloat(current.elo)
                    ? previous
                    : current;
                }).elo
              ) - 20,
            suggestedMax:
              parseFloat(
                playerInformation.value.eloList.reduce((previous, current) => {
                  return parseFloat(previous.elo) > parseFloat(current.elo)
                    ? previous
                    : current;
                }).elo
              ) + 20,
          },
        },
      };
    };

    return {
      isMeleeMatchResultShown,
      isTopAndBottomMatchResultShown,
      leagueList,
      matchResultList,
      nextURL,
      playerInformation,
      selectedLeague,
      fetchPlayerNextMatches,
      fetchPlayerStatisticsRelatedWithLeague,
    };
  },
});
</script>

<style scoped>
#content-item {
  border-bottom: solid 1px #dee2e6;
}

#content-item:last-child {
  border-bottom: none;
}

#player-name {
  color: white;
}

#signup-date {
  color: #767676;
}

.p-chart {
  width: 100%;
  min-height: 295px;
  max-height: 295px;
}
</style>
