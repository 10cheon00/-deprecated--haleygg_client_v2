<template>
  <div>
    <PageHeader>
      <p class="m-4 text-4xl font-bold">맵별 통계</p>
    </PageHeader>
    <div v-if="mapDataList">
      <!-- Header -->
      <div class="container p-3">
        <MapStatisticsList :data="mapDataList" />
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";

import PageHeader from "@/components/PageHeader.vue";
import ServerApi from "@/api/server/module.js";
import MapStatisticsList from "@/components/MapStatisticsList.vue";

export default defineComponent({
  components: {
    MapStatisticsList,
    PageHeader,
  },
  setup() {
    const mapDataList = ref(null);
    onMounted(async () => {
      //fetch map statistics
      const response = await ServerApi.fetchMeleeMapList();
      const mapList = response.data;
      for (let key in mapList) {
        let response = await ServerApi.fetchMapStatistics(mapList[key].name);
        mapList[key].aggregated_result = response.data;
      }
      mapDataList.value = mapList.reverse();
    });

    return {
      mapDataList,
    };
  },
});
</script>

<style scoped>
</style>