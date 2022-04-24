<template>
  <div class="flex">
    <div id="win-count-bar" :style="winCountBarStyle">
      <slot name="left-value">
        <span>{{ winCount }}승</span>
      </slot>
    </div>
    <div id="lose-count-bar" :style="loseCountBarStyle">
      <slot name="right-value">
        <span>{{ loseCount }}패</span>
      </slot>
    </div>
    <div v-if="winCount == 0 && loseCount == 0" id="blank-bar">&nbsp;</div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";

import { getPercentage } from "@/utils/utils.js";
import "@/css/color.css";

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
    winColor: {
      type: String,
      required: false,
      default: () => {
        return "#77abff";
      },
    },
    loseColor: {
      type: String,
      required: false,
      default: () => {
        return "#ff836d";
      },
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
        if (props.winColor) {
          style["background-color"] = props.winColor;
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
        if (props.loseColor) {
          style["background-color"] = props.loseColor;
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
  z-index: 0;
}

#blank-bar {
  background-color: lightgray;
  border-radius: 0.25rem;
  width: 100%;
}

#win-count-bar {
  background-color: rgb(var(--win-color));
  border-radius: 0.25rem 0 0 0.25rem;
  color: white;
  padding-left: 0.25rem;
  white-space: nowrap;
}

#lose-count-bar {
  background-color: rgb(var(--lose-color));
  border-radius: 0 0.25rem 0.25rem 0;
  color: white;
  padding-right: 0.25rem;
  text-align: right;
  white-space: nowrap;
}
</style>