<template>
  <div>
    <!-- Statistics -->
    <div v-if="mapStatistics">
      <div v-for="(mapData, index) in mapStatistics" :key="index">
        <div class="grid grid-nogutter" id="statistics">
          <div
            class="pt-3 pb-3"
            id="map-information"
            :style="{
              'background-image':
                `linear-gradient(180deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 1)),url(${mapData.image_url})`,
              'background-repeat': 'no-repeat',
              'background-size': 'cover',
              'background-position': 'center',
            }"
          >
            <!-- Information -->
            <div class="text-center p-3">
              <p class="p-1 text-3xl text-white">{{ mapData.name }}</p>
              <p class="p-1 text-xl text-100">총 게임 수 : {{ mapData.total_matches_count }}</p>
            </div>

            <!-- Statistics -->
            <div class="p-3 pt-0 text-white">
              <!-- Protoss's -->
              <div id="race-winning-rate">
                <div class="text-xl p-3">프로토스</div>
                <div class="text-sm pl-3 pr-3">
                  <label>VS 테란 / {{ mapData.aggregated_result.protoss_wins_to_terran_count }}승 {{ mapData.aggregated_result.protoss_loses_to_terran_count }}패</label>
                  <PercentageBar
                    :background="true"
                    :data="mapData.winningRate.protoss.versusTerran"
                  />
                  <label>VS 저그 / {{ mapData.aggregated_result.protoss_wins_to_zerg_count }}승 {{ mapData.aggregated_result.protoss_loses_to_zerg_count }}패</label>
                  <PercentageBar :background="true" :data="mapData.winningRate.protoss.versusZerg" />
                </div>
              </div>
              <!-- Terran's -->
              <div id="race-winning-rate">
                <div class="text-xl p-3">테란</div>
                <div class="text-sm pl-3 pr-3">
                  <label>VS 프로토스 / {{ mapData.aggregated_result.terran_wins_to_protoss_count }}승 {{ mapData.aggregated_result.terran_loses_to_protoss_count }}패</label>
                  <PercentageBar
                    :background="true"
                    :data="mapData.winningRate.terran.versusProtoss"
                  />
                  <label>VS 저그 / {{ mapData.aggregated_result.terran_wins_to_zerg_count }}승 {{ mapData.aggregated_result.terran_loses_to_zerg_count }}패</label>
                  <PercentageBar :background="true" :data="mapData.winningRate.terran.versusZerg" />
                </div>
              </div>
              <!-- Zerg's -->
              <div id="race-winning-rate">
                <div class="text-xl p-3">저그</div>
                <div class="text-sm pl-3 pr-3">
                  <label>VS 프로토스 / {{ mapData.aggregated_result.zerg_wins_to_protoss_count }}승 {{ mapData.aggregated_result.zerg_loses_to_protoss_count }}패</label>
                  <PercentageBar :background="true" :data="mapData.winningRate.zerg.versusProtoss" />
                  <label>VS 테란 / {{ mapData.aggregated_result.zerg_wins_to_terran_count }}승 {{ mapData.aggregated_result.zerg_loses_to_terran_count }}패</label>
                  <PercentageBar :background="true" :data="mapData.winningRate.zerg.versusTerran" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';

import PercentageBar from "@/components/PercentageBar.vue";

export default defineComponent({
  components: {
    PercentageBar
  },
  props: {
    data: Array
  },
  setup(props) {
    const protossColor = [230, 176, 0];
    const terranColor = [29, 115, 221];
    const zergColor = [116, 36, 174];

    const calculatePercentage = (wins, loses) => {
      return (wins / (wins + loses) * 100).toFixed(2);
    }

    const mapStatistics = ref(null);

    onMounted(() => {
      mapStatistics.value = props.data;

      mapStatistics.value.forEach(mapData => {
        const raceRelativity = {
          pvt: calculatePercentage(mapData.aggregated_result.protoss_wins_to_terran_count, mapData.aggregated_result.protoss_loses_to_terran_count),
          pvz: calculatePercentage(mapData.aggregated_result.protoss_wins_to_zerg_count, mapData.aggregated_result.protoss_loses_to_zerg_count),
          tvp: calculatePercentage(mapData.aggregated_result.terran_wins_to_protoss_count, mapData.aggregated_result.terran_loses_to_protoss_count),
          tvz: calculatePercentage(mapData.aggregated_result.terran_wins_to_zerg_count, mapData.aggregated_result.terran_loses_to_zerg_count),
          zvp: calculatePercentage(mapData.aggregated_result.zerg_wins_to_protoss_count, mapData.aggregated_result.zerg_loses_to_protoss_count),
          zvt: calculatePercentage(mapData.aggregated_result.zerg_wins_to_terran_count, mapData.aggregated_result.zerg_loses_to_terran_count),
        };
        mapData.winningRate = {};

        mapData.winningRate.protoss = {
          versusTerran: {
            color: terranColor,
            percentage: raceRelativity.pvt / 100,
            value: `${raceRelativity.pvt}%`
          },
          versusZerg: {
            color: zergColor,
            percentage: raceRelativity.pvz / 100,
            value: `${raceRelativity.pvz}%`
          }
        };
        mapData.winningRate.terran = {
          versusProtoss: {
            color: protossColor,
            percentage: raceRelativity.tvp / 100,
            value: `${raceRelativity.tvp}%`
          },
          versusZerg: {
            color: zergColor,
            percentage: raceRelativity.tvz / 100,
            value: `${raceRelativity.tvz}%`
          }
        };
        mapData.winningRate.zerg = {
          versusProtoss: {
            color: protossColor,
            percentage: raceRelativity.zvp / 100,
            value: `${raceRelativity.zvp}%`
          },
          versusTerran: {
            color: terranColor,
            percentage: raceRelativity.zvt / 100,
            value: `${raceRelativity.zvt}%`
          }
        };
      });
    });

    return {
      mapStatistics
    }
  }
});
</script>

<style>
#map-information {
  width: 100%;
}
</style>