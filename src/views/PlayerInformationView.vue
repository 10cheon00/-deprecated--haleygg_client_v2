<template>
  <div id="view">
    <!-- Profile -->
    <div id="profile" class="flex justify-content-between align-items-center">
      <div class="pl-8 text-4xl font-bold text-white">{{ playerName }}</div>
      <small class="pr-8 text-white">signup date : 2022-01-12</small>
    </div>

    <div class="grid grid-nogutter">
      <!-- Statistics -->
      <div class="col-12 md:col-4 p-3">
        <Panel header="Statistics">
          <div v-for="(item, index) in playerInformation.statistics" :key="item.label">
            <div class="flex justify-content-between">
              <span class="font-bold">{{ item.label }}</span>
              <span>{{ item.text }}</span>
            </div>
            <Divider v-if="index != playerInformation.statistics.length-1"/>
          </div>
        </Panel>
      </div>

      <!-- Elo chart -->
      <div class="col-12 md:col-8 p-3">
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
import Divider from "primevue/divider";
import Panel from "primevue/panel";

export default defineComponent({
  props: {
    playerName: {
      required: true,
      type: String,
    },
  },
  components: {
    Divider,
    Panel,
  },
  setup() {
    const playerInformation = {
      statistics: [
        { label: "개인", text: "1-5" },
        { label: "팀플", text: "3-3" },
        { label: "프로토스 승률", text: "14-11, 35%" },
        { label: "테란 승률", text: "13-13, 35%" },
        { label: "저그 승률", text: "21-31, 35%" },
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
#view {
  background-attachment: fixed;
  /* background-image: url("https://bnetcmsus-a.akamaihd.net/cms/gallery/7EKSWN98V7M91498587613057.jpg"); */
  /* background-image: url("https://bnetcmsus-a.akamaihd.net/cms/gallery/JHXVBPP04GHH1498587636883.jpg"); */
  /* background-image: url("https://bnetcmsus-a.akamaihd.net/cms/gallery/lt/LTHPT2MPAS8P1502725038501.jpg"); */
  background-position: center;
  background-repeat: repeat-y;
  background-size: 100%;
}
#profile {
  width: auto;
  min-height: 200px;
}
</style>