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
        <StatBoard
          header="Statistics" 
          :itemList="playerInformation.statistics"
          stripeColor="protoss"
        />
        
      </div>

      <!-- Elo chart -->
      <div class="col-12 md:col-8 p-3 ">
        ChartChartChartChartChartChartChartChartChartChart
        ChartChartChartChartChartChartChartChartChartChart
        ChartChartChartChartChartChartChartChartChartChart
        ChartChartChartChartChartChartChartChartChartChart
        ChartChartChartChartChartChartChartChartChartChart
        ChartChartChartChartChartChartChartChartChartChart
        ChartChartChartChartChartChartChartChartChartChart
      </div>
      <!-- List of Matches -->
      
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";

import StatBoard from "@/components/StatBoardComponent.vue";

export default defineComponent({
  props: {
    playerName: {
      required: true,
      type: String,
    },
  },
  components: {
    StatBoard
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

    return {
      playerInformation
    }
  },
});
</script>

<style scoped>

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