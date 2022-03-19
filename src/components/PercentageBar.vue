<template>
  <div>
    <div class="percentage-bar" :style="barStyle">
      <span>{{ data.label }}</span>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";

import { hexToRgb } from "@/utils/utils.js";

export default defineComponent({
  props: {
    data: {
      color: String,
      percentage: Number,
      label: Number,
    },
  },
  setup(props) {
    // const dataRef = toRefs(props).data;

    const barStyle = computed(() => {
      const rgbColor = hexToRgb(props.data.color);
      return {
        // "background-color": props.data.color,
        background: `
          repeating-linear-gradient(
            135deg,
            ${props.data.color} ,
            ${props.data.color} 10px,
            rgb(
              ${rgbColor[0] * 0.85},
              ${rgbColor[1] * 0.85},
              ${rgbColor[2] * 0.85}
            ) 10px,
            rgb(
              ${rgbColor[0] * 0.85},
              ${rgbColor[1] * 0.85},
              ${rgbColor[2] * 0.85}
            ) 20px
          )
          `,
        width: `${props.data.percentage}%`,
      };
    });

    return {
      barStyle,
    };
  },
});
</script>

<style scoped>
span {
  padding-right: 0.25rem;
  color: white;
}
.percentage-bar {
  border-radius: 0.25rem;
  display: flex;
  justify-content: flex-end;
  min-width: 2.75rem;
}
</style>