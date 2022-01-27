<template>
  <div id="view">
    <!-- Profile -->
    <div class="p-8" id="profile">
      <div class="text-4xl font-bold" id="player-name">{{ playerName }}</div>
      <small class="text-sm" id="signup-date">2022-01-12 가입</small>
    </div>

    <div class="grid grid-nogutter">
      <div class="col-12 md:col-4 grid grid-nogutter">
        <!-- Career -->
        <div class="col-12 p-3">
          <StripePanel header="Career" :stripeColor="race">
            <div class="p-3">아직 힘을 숨기고 있습니다...</div>
          </StripePanel>
        </div>

        <!-- Statistics -->
        <div class="col-12 p-3">
          <StripePanel header="Statistics" :stripeColor="race">
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
      </div>

      <!-- Elo chart -->
      <div class="col-12 md:col-8 p-3">
        <StripePanel header="Elo Chart" :stripeColor="race">
          ChartChartChartChartChartChartChartChartChartChart
          ChartChartChartChartChartChartChartChartChartChart
          ChartChartChartChartChartChartChartChartChartChart
          ChartChartChartChartChartChartChartChartChartChart
          ChartChartChartChartChartChartChartChartChartChart
          ChartChartChartChartChartChartChartChartChartChart
          ChartChartChartChartChartChartChartChartChartChart
        </StripePanel>
      </div>
    </div>

    <!-- List of Matches -->
    <div class="col-12 p-3" id="match-result-list">
      <StripePanel class="pb-1" header="Recent Matches" :stripeColor="race">
        <template #header-right>
          <CheckBox name="밀리 전적" v-model="isMeleeMatchResultShown" :binary="true" />
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
        resultListOwnerName="zzz--33f"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, computed } from "vue";
import CheckBox from "primevue/checkbox";

import MatchResultList from "@/components/MatchResultList.vue";
import StripePanel from "@/components/StripePanel.vue";

export default defineComponent({
  components: {
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

  setup() {
    const playerInformation = {
      statistics: [
        { label: "개인", value: "1-5" },
        { label: "팀플", value: "3-3" },
        { label: "프로토스 승률", value: "14-11, 35%" },
        { label: "테란 승률", value: "13-13, 35%" },
        { label: "저그 승률", value: "21-31, 35%" },
      ],
    };

    // before syntaxing, get statistics from server.

    const rawMatchResultList = [
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

    const isMeleeMatchResultShown = ref(true);
    const isTopAndBottomMatchResultShown = ref(true);

    const matchResultList = computed(() => {
      return rawMatchResultList.filter((matchResult) => {
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

    const race = "zerg";

    return {
      isMeleeMatchResultShown,
      isTopAndBottomMatchResultShown,
      matchResultList,
      playerInformation,
      race,
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

#profile {
  width: auto;
  min-height: 200px;
  background-attachment: fixed;
  /* background-image: url("https://bnetcmsus-a.akamaihd.net/cms/gallery/7EKSWN98V7M91498587613057.jpg"); */
  background-image: url("https://bnetcmsus-a.akamaihd.net/cms/gallery/JHXVBPP04GHH1498587636883.jpg");
  /* background-image: url("https://bnetcmsus-a.akamaihd.net/cms/gallery/lt/LTHPT2MPAS8P1502725038501.jpg"); */
  background-repeat: no-repeat;
  background-size: 100%;
}

#signup-date {
  color: #767676;
}
</style>
