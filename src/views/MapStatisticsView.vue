<template>
  <div>
    <!-- Form needed -->

    <div v-if="mapDataList">
      <!-- Header -->
      <div class="p-3">
        <StripePanel header="Map Statistics">
          <!-- Result -->
          <MapStatisticsList :data="mapDataList" />
        </StripePanel>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";

import ServerApi from "@/apis/server-api.js";
import StripePanel from "@/components/StripePanel.vue";
import MapStatisticsList from "@/components/MapStatisticsList.vue";

export default defineComponent({
  components: {
    MapStatisticsList,
    StripePanel,
  },
  setup() {
    const mapDataList = ref(null);
    onMounted(async () => {
      //fetch map statistics
      const response = await ServerApi.fetchMapList();
      const mapList = response.data;
      for (let key in mapList) {
        let response = await ServerApi.fetchMapStatistics(mapList[key].id);
        mapList[key].aggregated_result = response.data;
      }
      mapDataList.value = mapList;
    });

    return {
      mapDataList,
    };
  },
});
</script>

<style scoped>
</style>