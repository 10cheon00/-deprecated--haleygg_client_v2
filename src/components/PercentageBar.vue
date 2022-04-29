<template>
  <div>
    <div class="percentage-bar" :style="barStyle">
      <span>{{ data.label }}</span>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  props: {
    data: {
      color: Array,
      percentage: Number,
      label: Number,
    },
  },
  setup(props) {
    const barStyle = computed(() => {
      return {
        "background-color": `rgba(${props.data.color})`,
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