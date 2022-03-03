<template>
  <div
    class="flex justify-content-start"
    :id="background ? 'background' : 'none'"
  >
    <div :style="barStyle">
      <span id="value">{{ data.value }}</span>
    </div>
    <div id="background" />
  </div>
</template>

<script>
import { defineComponent, computed, toRefs } from "vue";

export default defineComponent({
  props: {
    background: {
      required: false,
      type: Boolean,
    },
    data: {
      color: Array,
      percentage: Number,
      value: Number,
    },
  },
  setup(props) {
    const dataRef = toRefs(props).data;

    const barStyle = computed(() => {
      return {
        background: `
          repeating-linear-gradient(
            45deg,
            rgb(${dataRef.value.color[0]},${dataRef.value.color[1]},${
          dataRef.value.color[2]
        }),
            rgb(${dataRef.value.color[0]},${dataRef.value.color[1]},${
          dataRef.value.color[2]
        }) 10px,
            rgb(${dataRef.value.color[0] * 0.85},${
          dataRef.value.color[1] * 0.85
        },${dataRef.value.color[2] * 0.85}) 10px,
            rgb(${dataRef.value.color[0] * 0.85},${
          dataRef.value.color[1] * 0.85
        },${dataRef.value.color[2] * 0.85}) 20px
          )`,
        "border-radius": "0.25rem",
        color: "white",
        display: "flex",
        "justify-content": "end",
        "min-width": "50px",
        "padding-right": "0.25rem",
        width: `${Math.round(dataRef.value.percentage * 1000) / 10}%`,
      };
    });

    return {
      barStyle,
    };
  },
});
</script>

<style scoped>
#value {
  margin-left: 0.25rem;
}

#background {
  background-color: #4e4e4e;
  border-radius: 0.25rem;
}
</style>