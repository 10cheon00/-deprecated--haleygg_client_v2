<template>
  <div id="stat-board">
    <!-- Header line -->
    <div id="header-stripe" :style="stripeStyle"></div>

    <div id="layout">
      <!-- Header -->
      <div id="header">{{ header }}</div>
      <!-- Content -->
      <div id="content">
        <div
          v-for="(item, index) in itemList"
          :key="index"
          id="content-item" 
          class="flex justify-content-between p-2"
        >
          <span>{{ item.label }}</span>
          <span>{{ item.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { colorConfig } from "@/css/color-config.js"

export default defineComponent({
  props: {
    header: {
      required: true,
      type: String,
    },
    itemList: {
      required: true,
      type: Array,
    },
    stripeColor: {
      required: false,
      type: String
    }
  },
  setup(props) {
    const getColor = () => {
      const color = colorConfig[props.stripeColor];
      if(color === undefined){
        return '#883cae';
      }
      return color;
    };

    const stripeStyle = {
      'background-color': getColor()
    };
    return {
      stripeStyle
    }
  },
});
</script>

<style scoped>
#header-stripe {
  height: 4px;
  /* background-color: black; */
}
#header {
  padding: 1rem 1.25rem;
  font-weight: bold;
  /* background-color: var(--surface-200); */
}
#layout {
  border: solid 1px #dee2e6;
  border-top: none;
}
#content-item {
  border-top: solid 1px #dee2e6;
}
</style>