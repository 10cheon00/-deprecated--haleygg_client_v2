<template>
  <div>
    <BasePageHeader>
      <p class="m-4 text-4xl font-bold">맵별 통계</p>
    </BasePageHeader>
    <BaseLoadingContainer :isLoaded="mapDataList != undefined">
      <!-- Header -->
      <div class="container p-3">
        <MapStatisticsList :data="mapDataList" />
      </div>
    </BaseLoadingContainer>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";

import BaseLoadingContainer from "@/components/BaseLoadingContainer.vue";
import BasePageHeader from "@/components/BasePageHeader.vue";
import MapStatisticsList from "@/components/MapStatisticsList.vue";
import ServerApi from "@/api/server/module.js";

export default defineComponent({
  components: {
    BaseLoadingContainer,
    BasePageHeader,
    MapStatisticsList,
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
      mapDataList.value = mapList.sort((a, b) => {
        return (
          b.aggregated_result.total_matches_count -
          a.aggregated_result.total_matches_count
        );
      });
    });

    return {
      mapDataList,
    };
  },
});
</script>

<style scoped>
</style>