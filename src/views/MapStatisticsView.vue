<template>
  <div>
    <!-- Header -->
    <div class="p-3">
      <StripePanel header="Map Statistics">
        <!-- Result -->
        <MapStatisticsList :data="mapStatisticsList"/>
      </StripePanel>
    </div>

  </div>
</template>
<script>
import { defineComponent } from 'vue';

import StripePanel from "@/components/StripePanel.vue";
import MapStatisticsList from "@/components/MapStatisticsList.vue";

export default defineComponent({
  components: {
    MapStatisticsList,
    StripePanel
  },
  setup() {
    const mapStatisticsList = [
      {
        "name": "투혼",
        "total_matches_count": 531,
        "image_url": 'http://www.panschk.de/mappage/pics/5369.jpg',
        "aggregated_result": {
          "protoss_wins_to_terran_count": 16,
          "protoss_loses_to_terran_count": 12,
          "protoss_wins_to_zerg_count": 29,
          "protoss_loses_to_zerg_count": 17,
          "terran_wins_to_protoss_count": 23,
          "terran_loses_to_protoss_count": 16,
          "terran_wins_to_zerg_count": 59,
          "terran_loses_to_zerg_count": 10,
          "zerg_wins_to_protoss_count": 21,
          "zerg_loses_to_protoss_count": 3,
          "zerg_wins_to_terran_count": 18,
          "zerg_loses_to_terran_count": 13,
        }
      },
      {
        "name": "서킷",
        "total_matches_count": 123,
        "image_url": 'http://www.panschk.de/mappage/pics/4949.jpg',
        "aggregated_result": {
          "protoss_wins_to_terran_count": 33,
          "protoss_loses_to_terran_count": 26,
          "protoss_wins_to_zerg_count": 27,
          "protoss_loses_to_zerg_count": 12,
          "terran_wins_to_protoss_count": 33,
          "terran_loses_to_protoss_count": 17,
          "terran_wins_to_zerg_count": 53,
          "terran_loses_to_zerg_count": 32,
          "zerg_wins_to_protoss_count": 81,
          "zerg_loses_to_protoss_count": 62,
          "zerg_wins_to_terran_count": 15,
          "zerg_loses_to_terran_count": 12,
        }
      },
      {
        "name": "이클립스",
        "total_matches_count": 23,
        "image_url": 'http://www.panschk.de/mappage/pics/5393.jpg',
        "aggregated_result": {
          "protoss_wins_to_terran_count": 5,
          "protoss_loses_to_terran_count": 3,
          "protoss_wins_to_zerg_count": 12,
          "protoss_loses_to_zerg_count": 7,
          "terran_wins_to_protoss_count": 23,
          "terran_loses_to_protoss_count": 5,
          "terran_wins_to_zerg_count": 12,
          "terran_loses_to_zerg_count": 10,
          "zerg_wins_to_protoss_count": 31,
          "zerg_loses_to_protoss_count": 30,
          "zerg_wins_to_terran_count": 1,
          "zerg_loses_to_terran_count": 1,
        }
      }
    ];

    return {
      mapStatisticsList,
    }
  },
})
</script>

<style scoped>
</style>