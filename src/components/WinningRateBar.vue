<template>
  <div class="">
    <div id="win-count-bar" :style="winCountBarStyle">
      <span>{{ winCount }}승</span>
    </div>
    <div id="lose-count-bar" :style="loseCountBarStyle">
      <span>{{ loseCount }}패</span>
    </div>
    <div v-if="winCount == 0 && loseCount == 0" id="blank-bar">&nbsp;</div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";

import { getPercentage } from "@/utils/utils.js";

export default defineComponent({
  props: {
    winCount: {
      type: Number,
      required: true,
    },
    loseCount: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const winCountBarStyle = computed(() => {
      const style = {};
      if (props.winCount == 0) {
        style.display = "none";
      } else {
        style.width = `${getPercentage(props.winCount, props.loseCount)}%`;
        if (props.loseCount == 0) {
          style["border-radius"] = "0.25rem";
        }
      }
      return style;
    });

    const loseCountBarStyle = computed(() => {
      const style = {};
      if (props.loseCount == 0) {
        style.display = "none";
      } else {
        style.width = `${getPercentage(props.loseCount, props.winCount)}%`;
        if (props.winCount == 0) {
          style["border-radius"] = "0.25rem";
        }
      }
      return style;
    });

    return {
      winCountBarStyle,
      loseCountBarStyle,
    };
  },
});
</script>

<style scoped>
span {
  font-size: small;
  vertical-align: top;
}
#blank-bar {
  background-color: lightgray;
  border-radius: 0.25rem;
  width: 100%;
}
#win-count-bar {
  background-color: #6966ff;
  border-radius: 0.25rem 0 0 0.25rem;
  color: white;
  padding-left: 0.25rem;
}
#lose-count-bar {
  background-color: #ff4040;
  border-radius: 0 0.25rem 0.25rem 0;
  color: white;
  padding-right: 0.25rem;
  text-align: right;
}
</style>