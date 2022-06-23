<template>
  <div class="item" @mouseenter="showTooltip()" @mouseleave="hideTooltip()">
    <div class="content">
      <slot name="content"></slot>
    </div>
    <div v-if="tooltipVisibility" class="tooltip">
      <slot name="tooltip"></slot>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    direction: {
      type: String,
      required: false,
      default: () => {
        return "bottom";
      },
    },
  },
  setup() {
    const tooltipVisibility = ref(false);
    const showTooltip = () => {
      tooltipVisibility.value = true;
    };

    const hideTooltip = () => {
      tooltipVisibility.value = false;
    };
    return { tooltipVisibility, showTooltip, hideTooltip };
  },
});
</script>
<style scoped>
.item {
  position: relative;
}

.item .tooltip {
  background: white;
  border: 1px solid #dee2e6;
  width: 100%;
  height: auto;
  position: absolute;
  left: 0%;
  top: 30px;
  opacity: 0;
  z-index: 2;
  display: none;
  visibility: hidden;
  transition: opacity 1s linear;
}

@media screen and (max-width: 768px) {
  .item .tooltip {
    display: inline-block;
    visibility: visible;
    opacity: 1;
  }
}
</style>
