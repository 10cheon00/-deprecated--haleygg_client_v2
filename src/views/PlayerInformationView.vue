<template>
  <div id="view">
    <!-- Profile -->
    <div id="profile" class="flex justify-content-between align-items-center text-white">
      <div class="pl-8 text-4xl font-bold">{{ playerName }}</div>
      <small class="pr-8">signup date : 2022-01-12</small>
    </div>

    <div class="grid grid-nogutter">
      <!-- Statistics -->
      <div class="col-12 md:col-4 p-3">
        <StripePanel header="Statistics" :stripeColor="race">
          <div
            v-for="(item, index) in playerInformation.statistics"
            :key="index"
            id="content-item" 
            class="flex justify-content-between p-2"
          >
            <span>{{ item.label }}</span>
            <span>{{ item.value }}</span>
          </div>
        </StripePanel>
        
      </div>

      <!-- Elo chart -->
      <div class="col-12 md:col-8 p-3 ">
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
    <div class="col-12 p-3">
      <StripePanel header="Recent Matches" :stripeColor="race">
      </StripePanel>
      <MatchResultList 
        class="mt-3"
        :matchResultList="matchResultList" 
        resultListOwnerName="asdf" 
      />
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";

import MatchResultList from "@/components/MatchResultList.vue";
import StripePanel from "@/components/StripePanel.vue";

export default defineComponent({
  props: {
    playerName: {
      required: true,
      type: String,
    },
  },
  components: {
    MatchResultList,
    StripePanel
  },
  setup() {
    const playerInformation = {
      statistics: [
        { label: "개인", value: "1-5" },
        { label: "팀플", value: "3-3" },
        { label: "프로토스 승률", value: "14-11, 35%" },
        { label: "테란 승률", value: "13-13, 35%" },
        { label: "저그 승률", value: "21-31, 35%" },
      ]
    };

    const applySyntaxToStatistics = () => {
      // before syntaxing, get statistics from server.
      // do syntax
    }
    applySyntaxToStatistics();

    const matchResultList = [
      {
        "league": "dasf",
        "date": "2022-01-24",
        "title": "41341",
        "map": "투혼",
        "winners": [
          {
            "name": "asdf",
            "race": "T"
          }
        ],
        "losers": [
          {
            "name": "fasdfdf",
            "race": "Z"
          }
        ],
        "miscellaneous": ""
      },{
        "league": "dasf",
        "date": "2022-01-24",
        "title": "41341",
        "map": "투혼",
        "winners": [
          {
            "name": "asdf",
            "race": "T"
          }
        ],
        "losers": [
          {
            "name": "fasdfdf",
            "race": "Z"
          }
        ],
        "miscellaneous": ""
      },
      {
        "league": "das31f",
        "date": "2022-12-24",
        "title": "41341314",
        "map": "헌트리스",
        "winners": [
          {
            "name": "r13r1r",
            "race": "P"
          },
          {
            "name": "zzz--33f",
            "race": "T"
          }
        ],
        "losers": [
          {
            "name": "fasdfdf",
            "race": "Z"
          },
          {
            "name": "asdf",
            "race": "T"
          }
        ],
        "miscellaneous": "기권패"
      },
      {
        "league": "das31f",
        "date": "2022-12-24",
        "title": "41341314",
        "map": "헌트리스",
        "winners": [
          {
            "name": "r13r1r",
            "race": "P"
          },
          {
            "name": "zzz--33f",
            "race": "T"
          }
        ],
        "losers": [
          {
            "name": "fasdfdf",
            "race": "Z"
          },
          {
            "name": "asdf",
            "race": "T"
          }
        ],
        "miscellaneous": "기권패"
      },
      {
        "league": "das31f",
        "date": "2022-12-24",
        "title": "41341314",
        "map": "헌트리스",
        "winners": [
          {
            "name": "r13r1r",
            "race": "P"
          },
          {
            "name": "zzz--33f",
            "race": "T"
          }
        ],
        "losers": [
          {
            "name": "fasdfdf",
            "race": "Z"
          },
          {
            "name": "asdf",
            "race": "T"
          }
        ],
        "miscellaneous": "기권패"
      },{
        "league": "dasf",
        "date": "2022-01-24",
        "title": "41341",
        "map": "투혼",
        "winners": [
          {
            "name": "asdf",
            "race": "T"
          }
        ],
        "losers": [
          {
            "name": "fasdfdf",
            "race": "Z"
          }
        ],
        "miscellaneous": ""
      },{
        "league": "dasf",
        "date": "2022-01-24",
        "title": "41341",
        "map": "투혼",
        "winners": [
          {
            "name": "asdf",
            "race": "T"
          }
        ],
        "losers": [
          {
            "name": "fasdfdf",
            "race": "Z"
          }
        ],
        "miscellaneous": ""
      },{
        "league": "dasf",
        "date": "2022-01-24",
        "title": "41341",
        "map": "투혼",
        "winners": [
          {
            "name": "asdf",
            "race": "T"
          }
        ],
        "losers": [
          {
            "name": "fasdfdf",
            "race": "Z"
          }
        ],
        "miscellaneous": ""
      },{
        "league": "dasf",
        "date": "2022-01-24",
        "title": "41341",
        "map": "투혼",
        "winners": [
          {
            "name": "asdf",
            "race": "T"
          }
        ],
        "losers": [
          {
            "name": "fasdfdf",
            "race": "Z"
          }
        ],
        "miscellaneous": ""
      },
      {
        "league": "das31f",
        "date": "2022-12-24",
        "title": "41341314",
        "map": "헌트리스",
        "winners": [
          {
            "name": "r13r1r",
            "race": "P"
          },
          {
            "name": "zzz--33f",
            "race": "T"
          }
        ],
        "losers": [
          {
            "name": "fasdfdf",
            "race": "Z"
          },
          {
            "name": "asdf",
            "race": "T"
          }
        ],
        "miscellaneous": "기권패"
      },
      {
        "league": "das31f",
        "date": "2022-12-24",
        "title": "41341314",
        "map": "헌트리스",
        "winners": [
          {
            "name": "r13r1r",
            "race": "P"
          },
          {
            "name": "zzz--33f",
            "race": "T"
          }
        ],
        "losers": [
          {
            "name": "fasdfdf",
            "race": "Z"
          },
          {
            "name": "asdf",
            "race": "T"
          }
        ],
        "miscellaneous": "기권패"
      },
    ]
    
    const race = "protoss"

    return {
      matchResultList,
      playerInformation,
      race
    }
  },
});
</script>

<style scoped>

#content-item {
  border-bottom: solid 1px #dee2e6;
}

#content-item:last-child{
  border-bottom: none;
}

#profile {
  width: auto;
  min-height: 200px;
  background-attachment: fixed;
  background-image: url("https://bnetcmsus-a.akamaihd.net/cms/gallery/7EKSWN98V7M91498587613057.jpg");
  /* background-image: url("https://bnetcmsus-a.akamaihd.net/cms/gallery/JHXVBPP04GHH1498587636883.jpg"); */
  /* background-image: url("https://bnetcmsus-a.akamaihd.net/cms/gallery/lt/LTHPT2MPAS8P1502725038501.jpg"); */
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>