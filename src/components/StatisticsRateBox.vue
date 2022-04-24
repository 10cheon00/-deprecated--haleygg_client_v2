<template>
  <div class="flex">
    <div class="p-2 label">
      {{ statistics.label }}
    </div>
    <div class="flex p-2 w-full">
      <div class="flex-none winning-rate">
        {{ getPercentage(statistics.winCount, statistics.loseCount) }}%
      </div>
      <WinningRateBar
        class="flex-grow-1 w-full"
        :winCount="statistics.winCount"
        :loseCount="statistics.loseCount"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import WinningRateBar from "@/components/WinningRateBar.vue";
import { getPercentage } from "@/utils/utils.js";

export default defineComponent({
  components: {
    WinningRateBar,
  },
  props: {
    statistics: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      getPercentage,
    };
  },
});
</script>

<style scoped>
.label {
  border-right: dashed 1px lightgray;
  min-width: 5rem;
  text-align: center;
  white-space: nowrap;
}

.winning-rate {
  color: #435862;
  font-size: small;
  text-align: center;
  min-width: 3rem;
}
</style>