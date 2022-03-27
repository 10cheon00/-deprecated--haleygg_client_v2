<template>
  <div>
    <div v-if="mapStatistics" class="grid grid-nogutter" id="statistics">
      <div
        v-for="(mapData, index) in mapStatistics"
        :key="index"
        :class="{
          'col-12 lg:col-6 pb-2': true,
          'pr-0 lg:pr-1': index % 2 == 0,
          'pr-0 lg:pl-1': index % 2,
          map: true,
        }"
      >
        <div
          :style="{
            'background-image': `linear-gradient(180deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5)),url(${mapData.image})`,
            'background-repeat': 'no-repeat',
            'background-size': 'cover',
            'background-position': 'center',
          }"
        >
          <!-- Information -->
          <div class="text-center p-3">
            <p class="p-1 text-3xl text-white">{{ mapData.name }}</p>
            <p class="p-1 text-xl text-100">
              총 게임 수 : {{ mapData.aggregated_result.total_matches_count }}
            </p>
          </div>

          <!-- Statistics -->
          <div class="p-3 text-white text-sm map-statistics">
            <!-- Protoss's -->
            <div
              v-if="mapData.pvt"
              class="flex align-items-center map-winning-rate"
            >
              <div class="flex-none map-race-label">
                <div>프로토스</div>
                <div>{{ mapData.pvt.protossWinningPercentage }}%</div>
              </div>

              <WinningRateBar
                class="flex-grow-1"
                :winCount="mapData.pvt.winCount"
                :loseCount="mapData.pvt.loseCount"
                :winColor="mapData.pvt.winColor"
                :loseColor="mapData.pvt.loseColor"
              >
                <template #right-value>
                  <span> {{ mapData.pvt.loseCount }}승 </span>
                </template>
              </WinningRateBar>

              <div class="flex-none map-race-label">
                <div>테란</div>
                <div>{{ mapData.pvt.terranWinningPercentage }}%</div>
              </div>
            </div>

            <!-- Terran's -->
            <div
              v-if="mapData.tvz"
              class="flex align-items-center map-winning-rate"
            >
              <div class="flex-none map-race-label">
                <div>테란</div>
                <div>{{ mapData.tvz.terranWinningPercentage }}%</div>
              </div>

              <WinningRateBar
                class="flex-grow-1"
                :winCount="mapData.tvz.winCount"
                :loseCount="mapData.tvz.loseCount"
                :winColor="mapData.tvz.winColor"
                :loseColor="mapData.tvz.loseColor"
              >
                <template #right-value>
                  <span> {{ mapData.tvz.loseCount }}승 </span>
                </template>
              </WinningRateBar>

              <div class="flex-none map-race-label">
                <div>저그</div>
                <div>{{ mapData.tvz.zergWinningPercentage }}%</div>
              </div>
            </div>

            <!-- Zerg's -->
            <div
              v-if="mapData.zvp"
              class="flex align-items-center map-winning-rate"
            >
              <div class="flex-none map-race-label">
                <div>저그</div>
                <div>{{ mapData.zvp.zergWinningPercentage }}%</div>
              </div>

              <WinningRateBar
                class="flex-grow-1"
                :winCount="mapData.zvp.winCount"
                :loseCount="mapData.zvp.loseCount"
                :winColor="mapData.zvp.winColor"
                :loseColor="mapData.zvp.loseColor"
              >
                <template #left-value>
                  <div>{{ mapData.zvp.winCount }}승</div>
                </template>
                <template #right-value>
                  <span> {{ mapData.zvp.loseCount }}승 </span>
                </template>
              </WinningRateBar>

              <div class="flex-none map-race-label">
                <div>프로토스</div>
                <div>{{ mapData.zvp.protossWinningPercentage }}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, toRef } from "vue";

import WinningRateBar from "@/components/WinningRateBar.vue";
import { getColor } from "@/css/color-config.js";
import { getPercentage } from "@/utils/utils.js";

export default defineComponent({
  components: {
    WinningRateBar,
  },
  props: {
    data: Array,
  },
  setup(props) {
    const mapStatistics = toRef(props, "data");

    onMounted(() => {
      Object.keys(mapStatistics.value).forEach((key) => {
        const map = mapStatistics.value[key];
        map.pvt = {
          winCount: map.aggregated_result.protoss_wins_to_terran_count,
          loseCount: map.aggregated_result.terran_wins_to_protoss_count,
          winColor: getColor("protoss"),
          loseColor: getColor("terran"),
          protossWinningPercentage: getPercentage(
            map.aggregated_result.protoss_wins_to_terran_count,
            map.aggregated_result.terran_wins_to_protoss_count
          ),
          terranWinningPercentage: getPercentage(
            map.aggregated_result.terran_wins_to_protoss_count,
            map.aggregated_result.protoss_wins_to_terran_count
          ),
        };
        map.tvz = {
          winCount: map.aggregated_result.terran_wins_to_zerg_count,
          loseCount: map.aggregated_result.zerg_wins_to_terran_count,
          winColor: getColor("terran"),
          loseColor: getColor("zerg"),
          terranWinningPercentage: getPercentage(
            map.aggregated_result.terran_wins_to_zerg_count,
            map.aggregated_result.zerg_wins_to_terran_count
          ),
          zergWinningPercentage: getPercentage(
            map.aggregated_result.zerg_wins_to_terran_count,
            map.aggregated_result.terran_wins_to_zerg_count
          ),
        };
        map.zvp = {
          winCount: map.aggregated_result.zerg_wins_to_protoss_count,
          loseCount: map.aggregated_result.protoss_wins_to_zerg_count,
          winColor: getColor("zerg"),
          loseColor: getColor("protoss"),
          zergWinningPercentage: getPercentage(
            map.aggregated_result.zerg_wins_to_protoss_count,
            map.aggregated_result.protoss_wins_to_zerg_count
          ),
          protossWinningPercentage: getPercentage(
            map.aggregated_result.protoss_wins_to_zerg_count,
            map.aggregated_result.zerg_wins_to_protoss_count
          ),
        };
      });
    });

    return {
      mapStatistics,
    };
  },
});
</script>

<style scoped>
.map-statistics {
  min-height: 16rem;
}
.map-race-label {
  min-width: 4rem;
  text-align: center;
}
.map-winning-rate {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
</style>