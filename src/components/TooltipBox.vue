<template>
  <div class="item" @mouseenter="showTooltip()" @mouseleave="hideTooltip()">
    <div class="content">
      <slot name="content"></slot>
    </div>
    <div v-if="tooltipVisibility" :class="`tooltip ${direction}`">
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
  border: 3px solid #b3b7bb;
  position: absolute;
  width: 100%;
  z-index: 2;
  display: none;
  visibility: hidden;
}

/* ------------ Top position ------------ */
.item .tooltip.top {
  left: 0%;
  top: -79px;
}

.item .tooltip.top::before {
  content: "";
  position: absolute;
  left: calc(50% - 10px);
  top: 64px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #b3b7bb;
}

.item .tooltip.bottom {
  left: 0%;
  top: 40px;
}

.item .tooltip.bottom::before {
  content: "";
  position: absolute;
  left: calc(50% - 10px);
  top: -13px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #b3b7bb;
}

@media screen and (max-width: 768px) {
  .item .tooltip {
    display: inline-block;
    visibility: visible;
  }
}
</style>
