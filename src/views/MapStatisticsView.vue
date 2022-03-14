<template>
  <div>
    <PageHeader>
      <p class="text-4xl m-4 font-bold">맵별 통계</p>
    </PageHeader>
    <div v-if="mapDataList">
      <!-- Header -->
      <div class="container p-3">
        <Panel header="Map Statistics" />
        <MapStatisticsList class="pt-2" :data="mapDataList" />
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";

import PageHeader from "@/components/PageHeader.vue";
import ServerApi from "@/api/server/module.js";
import Panel from "@/components/Panel.vue";
import MapStatisticsList from "@/components/MapStatisticsList.vue";

export default defineComponent({
  components: {
    MapStatisticsList,
    PageHeader,
    Panel,
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