<template>
  <div v-if="playerInformation.isFetched">
    <!-- Profile -->
    <div
      class="p-8"
      :style="{
        'min-height': '200px',
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
    </div>

    <div class="grid grid-nogutter">
      <!-- Career -->
      <div class="col-12 p-3 pb-0">
        <StripePanel
          header="Career"
          :stripeColor="playerInformation.profile.favorate_race"
        >
          <div class="p-3">{{ playerInformation.profile.career }}</div>
        </StripePanel>
      </div>
      <div class="col-12 grid grid-nogutter">
        <!-- Statistics -->
        <div class="col-12 md:col-4 p-3">
          <StripePanel
            header="Statistics"
            :stripeColor="playerInformation.favorate_race"
          >
            <div
              v-for="(item, index) in playerInformation.statistics"
              :key="index"
              class="grid grid-nogutter p-2"
              id="content-item"
            >
              <div class="col-4">{{ item.label }}</div>
              <div
                class="col-6 text-right"
                style="border-right: dashed 1px lightgray; padding-right: 10px"
              >
                {{ item.value }}
              </div>
              <div class="col-2 text-right" style="color: gray">
                {{ item.percentage }}
              </div>
            </div>
          </StripePanel>
        </div>

        <!-- Elo chart -->
        <div class="col-12 md:col-8 p-3">
          <StripePanel
            header="Elo Chart"
            :stripeColor="playerInformation.favorate_race"
          >
            <template #header-right>
              <DropDown
                v-model="selectedLeague"
                :options="leagueList"
                optionLabel="name"
                optionValue="id"
                @change="fetchPlayerStatisticsRelatedWithLeague()"
              />
            </template>
            <div id="elo-chart">
              <Chart
                type="line"
                :data="playerInformation.eloChartData"
                :options="playerInformation.eloChartOptions"
              />
            </div>
          </StripePanel>
        </div>
      </div>
    </div>

    <!-- List of Matches -->
    <div class="col-12 p-3 pt-0" id="match-result-list">
      <StripePanel
        class="pb-1"
        header="Recent Matches"
        :stripeColor="playerInformation.favorate_race"
      >
        <template #header-right>
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
      </StripePanel>

      <MatchResultList
        :matchResultList="matchResultList"
        :resultListOwnerName="playerName"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, computed, onMounted } from "vue";
import Chart from "primevue/chart";
import CheckBox from "primevue/checkbox";
import DropDown from "primevue/dropdown";

import ServerApi from "@/api/server/module.js";
import MatchResultList from "@/components/MatchResultList.vue";
import StripePanel from "@/components/StripePanel.vue";

export default defineComponent({
  components: {
    Chart,
    CheckBox,
    DropDown,
    MatchResultList,
    StripePanel,
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

    const isMeleeMatchResultShown = ref(true);
    const isTopAndBottomMatchResultShown = ref(true);

    const leagueList = ref(null);
    const selectedLeague = ref(null);

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
      selectedLeague.value = leagueList.value[0].id;

      // Fetch statistics and Elo and matches
      await fetchPlayerStatisticsRelatedWithLeague();

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
      rawMatchResultList.value = response.data;

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
      playerInformation,
      selectedLeague,
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
  height: 280px;
  min-height: 280px;
  max-height: 280px;
}
</style>
