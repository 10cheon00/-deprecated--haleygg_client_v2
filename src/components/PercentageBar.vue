<template>
  <div class="flex justify-content-start">
    <div :style="barStyle">
      <span id="value">{{ data.label }}</span>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";

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
      return {
        "background-color": props.data.color,
        "border-radius": "0.25rem",
        color: "white",
        display: "flex",
        "justify-content": "end",
        "min-width": "50px",
        "padding-right": "0.25rem",
        width: `${Math.round(props.data.percentage * 1000) / 10}%`,
      };
    });

    return {
      barStyle,
    };
  },
});
</script>

<style scoped>
</style>