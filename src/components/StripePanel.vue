<template>
  <div>
    <!-- Stripe -->
    <!-- <div id="header-stripe" :style="stripeStyle" /> -->

    <!-- Header -->
    <div id="panel-header">
      <div class="flex justify-content-between align-items-center">
        <div>{{ header }}</div>
        <div class="flex">
          <slot name="panel-header-right"></slot>
        </div>
      </div>
    </div>

    <!-- panel-content -->
    <div id="panel-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import { getColor } from "@/css/color-config.js";

export default defineComponent({
  props: {
    header: {
      required: false,
      type: String,
    },
    stripeColor: {
      required: false,
      type: String,
    },
  },
  setup(props) {
    const stripeStyle = {
      "background-color": getColor(props.stripeColor),
    };
    return {
      stripeStyle,
    };
  },
});
</script>

<style scoped>
#panel-header-stripe {
  height: 4px;
}
#panel-header {
  background-color: #f0f0f0;
  border: solid 1px #dee2e6;
  font-weight: bold;
  padding: 1rem 1.25rem;
}
#panel-content {
  border: solid 1px #dee2e6;
  border-top: none;
  height: auto;
}

#panel-content:empty {
  display: none;
}

#panel-header-right {
  vertical-align: middle;
}
</style>
