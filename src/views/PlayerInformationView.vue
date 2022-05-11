<template>
  <div v-if="playerInformation.isFetched">
    <!-- Profile -->
    <PageHeader
      :style="{
        width: 'auto',
        'background-image': `linear-gradient(90deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),
                      url('${playerInformation.profile.favorate_race_wallpaperUrl}')`,
        'background-position': 'top',
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
      }"
    >
      <!-- Profile -->
      <div class="text-4xl font-bold my-2" id="player-name">
        {{ playerInformation.profile.name }}
      </div>
      <small class="text-sm" id="signup-date"
        >{{
          convertHyphenWithDateFormat(playerInformation.profile.joined_date)
        }}
        가입</small
      >
      <!-- Tiers -->
      <div>
        <Chip
          v-for="(tier, index) in playerInformation.tierList"
          :key="index"
          :label="`${tier.league} ${tier.tier}`"
          class="tier mr-1 text-white"
          :style="{
            opacity:
              0.5 + ((index + 1) / playerInformation.tierList.length) * 0.5,
            'background-color': playerInformation.tierColor,
          }"
        />
      </div>
      <!-- Career -->
      <div class="text-200 my-2">
        {{ playerInformation.profile.career }}
      </div>
    </PageHeader>

    <MatchFilter :leagueList="leagueList" :mapList="mapList" />

    <div class="container grid grid-nogutter p-3 pt-0">
      <div class="col-12 grid grid-nogutter">
        <!-- Elo chart -->
        <div class="col-12">
          <Panel header="Elo 그래프">
            <div id="elo-chart">
              <Chart
                v-if="playerInformation.eloChartData"
                type="line"
                :data="playerInformation.eloChartData"
                :options="playerInformation.eloChartOptions"
              />
              <NullDataBox v-else />
            </div>
          </Panel>
        </div>
      </div>

      <!-- Statistics -->
      <div class="col-12 mt-2" id="statistics">
        <Panel header="통계">
          <div class="grid grid-nogutter">
            <!-- Melee -->
            <StatisticsRateBox
              class="col-12 item"
              :statistics="playerInformation.statistics.melee"
            />
            <!-- Top and bottom -->
            <StatisticsRateBox
              class="col-12 item"
              :statistics="playerInformation.statistics.topAndBottom"
            />
          </div>

          <!-- Race relativity -->
          <div class="grid grid-nogutter" id="race-relativity">
            <!-- Protoss -->
            <div class="col-12 md:col-4 grid grid-nogutter" id="protoss">
              <StatisticsRateBox
                v-for="(item, index) in playerInformation.statistics
                  .raceRelativity.protoss"
                :key="index"
                class="col-12 item"
                :statistics="item"
              />
            </div>
            <!-- Terran -->
            <div class="col-12 md:col-4 grid grid-nogutter" id="terran">
              <StatisticsRateBox
                v-for="(item, index) in playerInformation.statistics
                  .raceRelativity.terran"
                :key="index"
                class="col-12 item"
                :statistics="item"
              />
            </div>
            <!-- Zerg -->
            <div class="col-12 md:col-4 grid grid-nogutter" id="zerg">
              <StatisticsRateBox
                v-for="(item, index) in playerInformation.statistics
                  .raceRelativity.zerg"
                :key="index"
                class="col-12 item"
                :statistics="item"
              />
            </div>
          </div>
        </Panel>
      </div>

      <!-- List of Matches -->
      <Panel class="col-12 my-2" header="최근 전적">
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

        <!-- Matches summary -->
        <div
          v-if="matchResultList.length > 0"
          class="grid grid-nogutter p-0 flex-column md:flex-row"
          id="matches-summary"
        >
          <!-- nn경기 n승 n패 승률 nn.n% -->
          <div class="col matches-summary-item">
            <div>
              <div class="text-sm mb-3">
                {{ matchesSummary.totalCount }}전
                {{ matchesSummary.winCount }}승 {{ matchesSummary.loseCount }}패
              </div>
              <div class="text-2xl">{{ matchesSummary.winningRate }}%</div>
            </div>
          </div>
        </div>

        <NullDataBox v-else class="w-full" />
      </Panel>
      <MatchResultList
        :matchResultList="matchResultList"
        :resultListOwnerName="player.name"
        class="col-12"
      />
      <div
        v-if="nextURL"
        class="flex align-items-center justify-content-center"
        id="fetch-next-matches-button"
        @click="fetchNextMatches()"
      >
        <i class="pi pi-refresh"></i>&nbsp;더 보기
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, computed, onMounted, watch, provide } from "vue";
import Chart from "primevue/chart";
import CheckBox from "primevue/checkbox";
import Chip from "primevue/chip";

import MatchFilter from "@/components/MatchFilter.vue";
import MatchResultList from "@/components/MatchResultList.vue";
import NullDataBox from "@/components/NullDataBox.vue";
import PageHeader from "@/components/PageHeader.vue";
import Panel from "@/components/Panel.vue";
import ServerApi from "@/api/server/module.js";
import StatisticsRateBox from "@/components/StatisticsRateBox.vue";
import { getPercentage, convertHyphenWithDateFormat } from "@/utils/utils.js";
import { getColor } from "@/css/color-config.js";

export default defineComponent({
  components: {
    Chart,
    CheckBox,
    Chip,
    MatchFilter,
    MatchResultList,
    NullDataBox,
    PageHeader,
    Panel,
    StatisticsRateBox,
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
    const mapList = ref(null);
    const selectedMap = ref(null);
    const selectedLeagueType = ref(null);
    provide("selectedLeagueType", selectedLeagueType);
    provide("selectedLeague", selectedLeague);
    provide("selectedMap", selectedMap);

    onMounted(async () => {
      // Fetch profile.
      let response = await ServerApi.fetchPlayerDetail(props.playerName);
      playerInformation.value.profile = response.data;
      player.value = response.data;
      document.title = `${player.value.name} - 전적 조회 - Haleygg.kr`;

      playerInformation.value.profile.favorate_race_wallpaperUrl =
        getWallpaperUrlByRace(player.value.favorate_race);

      // Fetch leagueList first to request only for specific league.
      response = await ServerApi.fetchLeagueList();
      leagueList.value = response.data;
      leagueList.value.forEach((league) => (league.label = league.name));

      response = await ServerApi.fetchMapList();
      mapList.value = response.data.reverse();
      mapList.value.forEach((map) => (map.label = map.name));

      // Fetch statistics, Elo and matches
      await fetchMatches();
      await fetchStatistics();
      await fetchTier();

      watch(selectedLeagueType, async () => {
        clearEloHistory();
        await fetchMatches();
        await fetchStatistics();
        if (selectedLeagueType.value) {
          await fetchEloHistory();
        } else {
          clearEloHistory();
        }
      });

      watch(selectedLeague, async () => {
        if (selectedLeagueType.value) {
          await fetchMatches();
          await fetchStatistics();
        }
      });

      watch(selectedMap, async () => {
        await fetchMatches();
        await fetchStatistics();
      });

      playerInformation.value.isFetched = true;
    });

    const getWallpaperUrlByRace = (race) => {
      const wallpaper = {
        P: "https://bnetcmsus-a.akamaihd.net/cms/gallery/7EKSWN98V7M91498587613057.jpg",
        T: "https://bnetcmsus-a.akamaihd.net/cms/gallery/lt/LTHPT2MPAS8P1502725038501.jpg",
        Z: "https://bnetcmsus-a.akamaihd.net/cms/gallery/JHXVBPP04GHH1498587636883.jpg",
      };
      let url = "";
      if (Object.keys(wallpaper).find((key) => key == race)) {
        url = wallpaper[race];
      } else {
        url = "https://i.imgur.com/SK3Kyyf.jpeg";
      }
      return url;
    };

    const fetchNextMatches = async () => {
      if (nextURL.value) {
        const url = nextURL.value;
        const response = await ServerApi.fetchPlayerNextMatches(url);
        addMatchResultsToList(response.data);
      }
    };

    const fetchStatistics = async () => {
      const response = await ServerApi.fetchPlayerStatistics(
        player.value.name,
        selectedLeague.value,
        selectedLeagueType.value,
        selectedMap.value
      );
      playerInformation.value.statistics = aggregateStatistics(response.data);
    };

    const aggregateStatistics = (data) => {
      const statistics = {
        melee: {
          label: "개인",
          winCount: data.winning_melee_matches_count,
          loseCount: data.losing_melee_matches_count,
        },
        topAndBottom: {
          label: "팀플",
          winCount: data.winning_top_and_bottom_matches_count,
          loseCount: data.losing_top_and_bottom_matches_count,
        },
        raceRelativity: {
          protoss: [
            {
              label: "P vs P",
              winCount: data.protoss_wins_to_protoss_count,
              loseCount: data.protoss_loses_to_protoss_count,
            },
            {
              label: "P vs T",
              winCount: data.protoss_wins_to_terran_count,
              loseCount: data.protoss_loses_to_terran_count,
            },
            {
              label: "P vs Z",
              winCount: data.protoss_wins_to_zerg_count,
              loseCount: data.protoss_loses_to_zerg_count,
            },
          ],
          terran: [
            {
              label: "T vs P",
              winCount: data.terran_wins_to_protoss_count,
              loseCount: data.terran_loses_to_protoss_count,
            },
            {
              label: "T vs T",
              winCount: data.terran_wins_to_terran_count,
              loseCount: data.terran_loses_to_terran_count,
            },
            {
              label: "T vs Z",
              winCount: data.terran_wins_to_zerg_count,
              loseCount: data.terran_loses_to_zerg_count,
            },
          ],
          zerg: [
            {
              label: "Z vs P",
              winCount: data.zerg_wins_to_protoss_count,
              loseCount: data.zerg_loses_to_protoss_count,
            },
            {
              label: "Z vs T",
              winCount: data.zerg_wins_to_terran_count,
              loseCount: data.zerg_loses_to_terran_count,
            },
            {
              label: "Z vs Z",
              winCount: data.zerg_wins_to_zerg_count,
              loseCount: data.zerg_loses_to_zerg_count,
            },
          ],
        },
      };

      return statistics;
    };

    const fetchMatches = async () => {
      const response = await ServerApi.fetchPlayerMatches(
        player.value.name,
        selectedLeague.value,
        selectedLeagueType.value,
        selectedMap.value
      );
      rawMatchResultList.value = [];
      addMatchResultsToList(response.data);
    };

    const addMatchResultsToList = (data) => {
      rawMatchResultList.value = rawMatchResultList.value.concat(data.results);
      nextURL.value = data.next;
    };

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

    const matchesSummary = computed(() => {
      const data = matchResultList.value.reduce(
        (data, match) => {
          const isWinMatch = match.player_tuples.some((playerTuple) => {
            return playerTuple.winner == player.value.name;
          });
          if (isWinMatch) {
            data.winCount += 1;
          } else {
            data.loseCount += 1;
          }
          data.totalCount += 1;
          return data;
        },
        {
          totalCount: 0,
          winCount: 0,
          loseCount: 0,
          winningRate: 0,
        }
      );
      data.winningRate = getPercentage(data.winCount, data.loseCount);
      return data;
    });

    const fetchEloHistory = async () => {
      const response = await ServerApi.fetchPlayerEloHistory(
        player.value.name,
        selectedLeagueType.value
      );

      // clear chart when fetched empty result.
      if (response.data.results.length == 0) {
        playerInformation.value.eloList = null;
        playerInformation.value.eloChartData = null;
        playerInformation.value.eloChartOptions = null;
        return;
      }

      // divide items with same x axis value.
      const dividedEloList = response.data.results.reverse();
      const dates = [];
      let count = 0;
      dividedEloList.forEach((item) => {
        const isNotDuplicate = dates.includes(item.date) == false;
        if (isNotDuplicate) {
          dates.push(item.date);
          count = 0;
        } else {
          item.date += ` (${++count})`;
        }
        item.date = item.date.slice(2);
      });
      playerInformation.value.eloList = dividedEloList;

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
          yAxisKey: "rating",
        },
        plugins: {
          datalabels: {
            anchor: "end",
            align: "top",
            backgroundColor: "#222c3155",
            clamp: true,
            color: "white",
            borderRadius: "5",
            formatter: (value) => {
              return value.rating;
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
                  return parseFloat(previous.rating) <
                    parseFloat(current.rating)
                    ? previous
                    : current;
                }).rating
              ) - 20,
            suggestedMax:
              parseFloat(
                playerInformation.value.eloList.reduce((previous, current) => {
                  return parseFloat(previous.rating) >
                    parseFloat(current.rating)
                    ? previous
                    : current;
                }).rating
              ) + 20,
          },
          x: {
            ticks: {
              maxRotation: 0,
            },
          },
        },
      };
    };

    const clearEloHistory = () => {
      playerInformation.value.eloList = null;
      playerInformation.value.eloChartData = null;
      playerInformation.value.eloChartOptions = null;
    };

    const fetchTier = async () => {
      try {
        const response = await ServerApi.fetchPlayerTier(player.value.name);
        playerInformation.value.tierList = response.data.reverse();
        switch (playerInformation.value.profile.favorate_race) {
          case "T":
            playerInformation.value.tierColor = getColor("terran");
            break;
          case "P":
            playerInformation.value.tierColor = getColor("protoss");
            break;
          case "Z":
            playerInformation.value.tierColor = getColor("zerg");
            break;
        }
      } catch (err) {
        if (err.response.status == 404) {
          clearTier();
        }
      }
    };

    const clearTier = () => {
      playerInformation.value.tierList = undefined;
    };

    return {
      isMeleeMatchResultShown,
      isTopAndBottomMatchResultShown,
      leagueList,
      mapList,
      matchResultList,
      matchesSummary,
      nextURL,
      player,
      playerInformation,
      selectedLeague,

      convertHyphenWithDateFormat,
      getColor,
      getPercentage,
      fetchNextMatches,
    };
  },
});
</script>

<style scoped>
#fetch-next-matches-button {
  background-color: #f0f0f0;
  border: 1px solid #dee2e6;
  color: gray;
  height: 3rem;
  margin-top: 0.5rem;
  text-align: center;
  width: 100%;
  cursor: pointer;
}

#player-name {
  color: white;
}

#signup-date {
  color: #767676;
}

.tier {
  font-size: 0.25rem;
}

#elo-chart {
  height: 145px;
  min-height: 145px;
  max-height: 145px;
  width: 100%;
}

#statistics .item {
  border-bottom: solid 1px #dee2e6;
}

#statistics #race-relativity .item {
  border-right: none;
}

#statistics #race-relativity #zerg .item:last-child {
  border-bottom: none;
}

@media (min-width: 768px) {
  #statistics #race-relativity .item {
    border-right: solid 1px #dee2e6;
  }

  #statistics #race-relativity .item:last-child {
    border-bottom: none;
  }

  #statistics #race-relativity #zerg .item {
    border-right: none;
  }
}

.matches-summary-item {
  border-bottom: 1px solid #dee2e6;
  border-right: 1px solid #dee2e6;
  padding: 1rem;
  text-align: center;
}

.matches-summary-item:last-child {
  border-right: none;
  border-bottom: none;
}

@media (min-width: 768px) {
  .matches-summary-item {
    border-bottom: none;
  }
}
</style>
