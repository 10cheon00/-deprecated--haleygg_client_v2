<template>
  <div>
    <!-- Stripe -->
    <div id="header-stripe" :style="stripeStyle"/>

    <!-- Header -->
    <div id="header">{{ header }}</div>

    <!-- Content -->
    <div id="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { getColor } from '@/css/color-config.js';

export default defineComponent({
  props: {
    header: {
      required: true,
      type: String
    },
    stripeColor: {
      required: false,
      type: String
    }
  },
  setup(props) {
    const stripeStyle = {
      'background-color': getColor(props.stripeColor)
    }
    return {
      stripeStyle
    }
  },
})
</script>

<style scoped>
#header-stripe {
  height: 4px;
}
#header {
  /* background-color: #f8efb9; */
  border: solid 1px #dee2e6;
  border-top: none;
  font-weight: bold;
  padding: 1rem 1.25rem;
}
#content {
  border: solid 1px #dee2e6;
  border-top: none;
}

</style>