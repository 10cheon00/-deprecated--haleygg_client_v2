<template>
  <div>
    <!-- Statistics -->
    <div v-if="mapStatistics" class="grid grid-nogutter" id="statistics">
      <div
        v-for="(mapData, index) in mapStatistics"
        :key="index"
        :class="{
          'col-12 lg:col-6 pb-2': true,
          'pr-0 lg:pr-1': index % 2 == 0,
          'pr-0 lg:pl-1': index % 2,
        }"
        id="map-information"
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
          <div class="p-3 pt-0 text-white">
            <!-- Protoss's -->
            <div id="race-winning-rate">
              <div class="text-xl font-bold p-3">프로토스</div>
              <div class="text-sm text-300">
                <p>
                  vs 테란
                  {{ mapData.aggregated_result.protoss_wins_to_terran_count }}승
                  {{ mapData.aggregated_result.terran_wins_to_protoss_count }}패
                </p>
                <PercentageBar
                  :background="true"
                  :data="mapData.winningRate.protoss.versusTerran"
                />
                <p>
                  vs 저그
                  {{ mapData.aggregated_result.protoss_wins_to_zerg_count }}승
                  {{ mapData.aggregated_result.zerg_wins_to_protoss_count }}패
                </p>
                <PercentageBar
                  :background="true"
                  :data="mapData.winningRate.protoss.versusZerg"
                />
              </div>
            </div>
            <!-- Terran's -->
            <div id="race-winning-rate">
              <div class="text-xl font-bold p-3">테란</div>
              <div class="text-sm text-300">
                <p>
                  vs 프로토스
                  {{ mapData.aggregated_result.terran_wins_to_protoss_count }}승
                  {{ mapData.aggregated_result.protoss_wins_to_terran_count }}패
                </p>
                <PercentageBar
                  :background="true"
                  :data="mapData.winningRate.terran.versusProtoss"
                />
                <p>
                  vs 저그
                  {{ mapData.aggregated_result.terran_wins_to_zerg_count }}승
                  {{ mapData.aggregated_result.zerg_wins_to_terran_count }}패
                </p>
                <PercentageBar
                  :background="true"
                  :data="mapData.winningRate.terran.versusZerg"
                />
              </div>
            </div>
            <!-- Zerg's -->
            <div id="race-winning-rate">
              <div class="text-xl font-bold p-3">저그</div>
              <div class="text-sm text-300">
                <p>
                  vs 프로토스
                  {{ mapData.aggregated_result.zerg_wins_to_protoss_count }}승
                  {{ mapData.aggregated_result.protoss_wins_to_zerg_count }}패
                </p>
                <PercentageBar
                  :background="true"
                  :data="mapData.winningRate.zerg.versusProtoss"
                />
                <p>
                  vs 테란
                  {{ mapData.aggregated_result.zerg_wins_to_terran_count }}승
                  {{ mapData.aggregated_result.terran_wins_to_zerg_count }}패
                </p>
                <PercentageBar
                  :background="true"
                  :data="mapData.winningRate.zerg.versusTerran"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";

import PercentageBar from "@/components/PercentageBar.vue";
import { getColor } from "@/css/color-config.js";
import { getPercentage } from "@/utils/utils.js";

export default defineComponent({
  components: {
    PercentageBar,
  },
  props: {
    data: Array,
  },
  setup(props) {
    const mapStatistics = ref(null);

    onMounted(() => {
      props.data.forEach((mapData) => {
        const raceRelativity = {
          pvt: getPercentage(
            mapData.aggregated_result.protoss_wins_to_terran_count,
            mapData.aggregated_result.terran_wins_to_protoss_count
          ),
          pvz: getPercentage(
            mapData.aggregated_result.protoss_wins_to_zerg_count,
            mapData.aggregated_result.zerg_wins_to_protoss_count
          ),
          tvp: getPercentage(
            mapData.aggregated_result.terran_wins_to_protoss_count,
            mapData.aggregated_result.protoss_wins_to_terran_count
          ),
          tvz: getPercentage(
            mapData.aggregated_result.terran_wins_to_zerg_count,
            mapData.aggregated_result.zerg_wins_to_terran_count
          ),
          zvp: getPercentage(
            mapData.aggregated_result.zerg_wins_to_protoss_count,
            mapData.aggregated_result.protoss_wins_to_zerg_count
          ),
          zvt: getPercentage(
            mapData.aggregated_result.zerg_wins_to_terran_count,
            mapData.aggregated_result.terran_wins_to_zerg_count
          ),
        };
        mapData.winningRate = {};

        mapData.winningRate.protoss = {
          versusTerran: {
            color: getColor("terran"),
            percentage: raceRelativity.pvt,
            label: `${raceRelativity.pvt}%`,
          },
          versusZerg: {
            color: getColor("zerg"),
            percentage: raceRelativity.pvz,
            label: `${raceRelativity.pvz}%`,
          },
        };
        mapData.winningRate.terran = {
          versusProtoss: {
            color: getColor("protoss"),
            percentage: raceRelativity.tvp,
            label: `${raceRelativity.tvp}%`,
          },
          versusZerg: {
            color: getColor("zerg"),
            percentage: raceRelativity.tvz,
            label: `${raceRelativity.tvz}%`,
          },
        };
        mapData.winningRate.zerg = {
          versusProtoss: {
            color: getColor("protoss"),
            percentage: raceRelativity.zvp,
            label: `${raceRelativity.zvp}%`,
          },
          versusTerran: {
            color: getColor("terran"),
            percentage: raceRelativity.zvt,
            label: `${raceRelativity.zvt}%`,
          },
        };
      });
      mapStatistics.value = props.data;
    });

    return {
      mapStatistics,
    };
  },
});
</script>

<style scoped>
</style>