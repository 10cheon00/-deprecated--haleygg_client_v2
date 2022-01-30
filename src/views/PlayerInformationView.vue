<template>
  <div id="view" v-if="playerInformation">
    <!-- Profile -->
    <div
      class="p-8"
      :style="{
        'min-height': '200px',
        'width': '100%',
        'background-attachment': 'fixed',
        'background-image':
          `linear-gradient(90deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),
                      url('${playerInformation.profile.favorate_race_wallpaperUrl}')`,
        'background-position': 'center',
        'background-repeat': 'no-repeat',
        'background-size': 'cover'
      }"
    >
      <div class="text-4xl font-bold mb-3" id="player-name">{{ playerInformation.profile.name }}</div>
      <small class="text-sm" id="signup-date">{{ playerInformation.profile.joined_date }} 가입</small>
    </div>

    <div class="grid grid-nogutter">
      <!-- Career -->
      <div class="col-12 p-3 pb-0">
        <StripePanel header="Career" :stripeColor="playerInformation.profile.favorate_race">
          <div class="p-3">{{ playerInformation.profile.career }}</div>
        </StripePanel>
      </div>
      <div class="col-12 grid grid-nogutter">
        <!-- Statistics -->
        <div class="col-12 md:col-4 p-3">
          <StripePanel header="Statistics" :stripeColor="playerInformation.favorate_race">
            <div
              class="flex justify-content-between p-2"
              id="content-item"
              v-for="(item, index) in playerInformation.statistics"
              :key="index"
            >
              <span>{{ item.label }}</span>
              <span>{{ item.value }}</span>
            </div>
          </StripePanel>
        </div>

        <!-- Elo chart -->
        <div class="col-12 md:col-8 p-3" id="elo-chart">
          <StripePanel header="Elo Chart" :stripeColor="playerInformation.favorate_race">
            <Chart
              type="line"
              :data="playerInformation.eloChartData" 
              :options="playerInformation.eloChartOptions"
            />
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
          <CheckBox name="밀리 전적" v-model="isMeleeMatchResultShown" :binary="true" />
          <label class="ml-1 mr-3">밀리</label>
          <CheckBox name="팀플 전적" v-model="isTopAndBottomMatchResultShown" :binary="true" />
          <label class="ml-1">팀플</label>
        </template>
      </StripePanel>

      <MatchResultList :matchResultList="matchResultList" resultListOwnerName="zzz--33f" />
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, computed, onMounted } from "vue";
import Chart from "primevue/chart";
import CheckBox from "primevue/checkbox";

import MatchResultList from "@/components/MatchResultList.vue";
import StripePanel from "@/components/StripePanel.vue";

export default defineComponent({
  components: {
    Chart,
    CheckBox,
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
    const playerInformation = ref(null);
    const rawMatchResultList = ref([]);

    const isMeleeMatchResultShown = ref(true);
    const isTopAndBottomMatchResultShown = ref(true);

    onMounted(() => {
      // fetch.
      rawMatchResultList.value = [
        {
          league: "dasf",
          date: "2022-01-24",
          title: "41341",
          map: "투혼",
          winners: [
            {
              name: "asdf",
              race: "T",
            },
          ],
          losers: [
            {
              name: "fasdfdf",
              race: "Z",
            },
          ],
          miscellaneous: "",
        },
        {
          league: "dasf",
          date: "2022-01-24",
          title: "41341",
          map: "투혼",
          winners: [
            {
              name: "asdf",
              race: "T",
            },
          ],
          losers: [
            {
              name: "fasdfdf",
              race: "Z",
            },
          ],
          miscellaneous: "",
        },
        {
          league: "das31f",
          date: "2022-12-24",
          title: "41341314",
          map: "헌트리스",
          winners: [
            {
              name: "r13r1r",
              race: "P",
            },
            {
              name: "zzz--33f",
              race: "T",
            },
          ],
          losers: [
            {
              name: "fasdfdf",
              race: "Z",
            },
            {
              name: "asdf",
              race: "T",
            },
          ],
          miscellaneous: "기권패",
        },
        {
          league: "das31f",
          date: "2022-12-24",
          title: "41341314",
          map: "헌트리스",
          winners: [
            {
              name: "r13r1r",
              race: "P",
            },
            {
              name: "zzz--33f",
              race: "T",
            },
          ],
          losers: [
            {
              name: "fasdfdf",
              race: "Z",
            },
            {
              name: "asdf",
              race: "T",
            },
          ],
          miscellaneous: "기권패",
        },
        {
          league: "das31f",
          date: "2022-12-24",
          title: "41341314",
          map: "헌트리스",
          winners: [
            {
              name: "r13r1r",
              race: "P",
            },
            {
              name: "zzz--33f",
              race: "T",
            },
          ],
          losers: [
            {
              name: "fasdfdf",
              race: "Z",
            },
            {
              name: "asdf",
              race: "T",
            },
          ],
          miscellaneous: "기권패",
        },
        {
          league: "dasf",
          date: "2022-01-24",
          title: "41341",
          map: "투혼",
          winners: [
            {
              name: "asdf",
              race: "T",
            },
          ],
          losers: [
            {
              name: "fasdfdf",
              race: "Z",
            },
          ],
          miscellaneous: "",
        },
        {
          league: "dasf",
          date: "2022-01-24",
          title: "41341",
          map: "투혼",
          winners: [
            {
              name: "asdf",
              race: "T",
            },
          ],
          losers: [
            {
              name: "fasdfdf",
              race: "Z",
            },
          ],
          miscellaneous: "",
        },
        {
          league: "dasf",
          date: "2022-01-24",
          title: "41341",
          map: "투혼",
          winners: [
            {
              name: "asdf",
              race: "T",
            },
          ],
          losers: [
            {
              name: "fasdfdf",
              race: "Z",
            },
          ],
          miscellaneous: "",
        },
        {
          league: "dasf",
          date: "2022-01-24",
          title: "41341",
          map: "투혼",
          winners: [
            {
              name: "asdf",
              race: "T",
            },
          ],
          losers: [
            {
              name: "fasdfdf",
              race: "Z",
            },
          ],
          miscellaneous: "",
        },
        {
          league: "das31f",
          date: "2022-12-24",
          title: "41341314",
          map: "헌트리스",
          winners: [
            {
              name: "r13r1r",
              race: "P",
            },
            {
              name: "zzz--33f",
              race: "T",
            },
          ],
          losers: [
            {
              name: "fasdfdf",
              race: "Z",
            },
            {
              name: "asdf",
              race: "T",
            },
          ],
          miscellaneous: "기권패",
        },
        {
          league: "das31f",
          date: "2022-12-24",
          title: "41341314",
          map: "헌트리스",
          winners: [
            {
              name: "r13r1r",
              race: "P",
            },
            {
              name: "zzz--33f",
              race: "T",
            },
          ],
          losers: [
            {
              name: "fasdfdf",
              race: "Z",
            },
            {
              name: "asdf",
              race: "T",
            },
          ],
          miscellaneous: "기권패",
        },
      ];

      playerInformation.value = {};

      // fetch profile
      playerInformation.value.profile = {
        'name': props.playerName,
        'joined_date': '2022-1-14',
        'favorate_race': 'T',
        'career': '아직 힘을 감추고 있습니다...'
      };

      const raceWallpaperUrls = {
        'P': "https://bnetcmsus-a.akamaihd.net/cms/gallery/7EKSWN98V7M91498587613057.jpg",
        'T': "https://bnetcmsus-a.akamaihd.net/cms/gallery/lt/LTHPT2MPAS8P1502725038501.jpg",
        'Z': "https://bnetcmsus-a.akamaihd.net/cms/gallery/JHXVBPP04GHH1498587636883.jpg"
      };

      playerInformation.value.profile.favorate_race_wallpaperUrl = raceWallpaperUrls[playerInformation.value.profile.favorate_race];

      // create statistics from match result list
      playerInformation.value.statistics = [
        { label: "개인 승률", value: "1-5 / 34%" },
        { label: "팀플 승률", value: "3-3 / 10%" },
        { label: "프로토스 승률", value: "14-11 / 35%" },
        { label: "테란 승률", value: "13-13 / 35%" },
        { label: "저그 승률", value: "21-31 / 35%" },
      ];

      playerInformation.value.eloList = [
        { date: '2022-01-22', elo: 1001 },
        { date: '2022-01-23', elo: 1006 },
        { date: '2022-01-25', elo: 1003 },
        { date: '2022-01-27', elo: 1020 },
        { date: '2022-01-29', elo: 1031 },
        { date: '2022-01-31', elo: 1018 },
        { date: '2022-02-02', elo: 1004 },
        { date: '2022-02-25', elo: 983 }
      ];

      playerInformation.value.eloChartData = {
        datasets: [{
          data: playerInformation.value.eloList,
          pointBackgroundColor: "#546e71",
          pointBorderColor: "#222c31"
        }]
      };

      playerInformation.value.eloChartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        aspectRatio: 3,
        parsing: {
          xAxisKey: 'date',
          yAxisKey: 'elo'
        },
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'top',
            backgroundColor: "#222c31",
            color: "white",
            borderRadius: '5',
            formatter: (value) => {
              return value.elo;
            }
          },
          legend:{
            display: false
          }
        },
      }
    });

    const matchResultList = computed(() => {
      return rawMatchResultList.value.filter(matchResult => {
        const matchType = matchResult.winners.length > 1 ? "topAndBottom" : "melee";
        if (matchType == "topAndBottom" && isTopAndBottomMatchResultShown.value) {
          return true;
        }
        if (matchType == "melee" && isMeleeMatchResultShown.value) {
          return true;
        }
        return false;
      });
    });

    return {
      isMeleeMatchResultShown,
      isTopAndBottomMatchResultShown,
      matchResultList,
      playerInformation,
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

.p-chart{
  width: 100%;
  min-height:185px;
  max-height:185px;
}
</style>
