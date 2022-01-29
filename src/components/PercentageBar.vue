<template>
  <div class="flex justify-content-start" :id="(background)?'background':'none'">
    <div :style="barStyle">
      <span id="value">{{ data.value }}</span>
    </div>
    <div id="background"/>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    background: {
      required: false,
      type: Boolean
    },
    data: {
      color: Array,
      percentage: Number,
      value: Number,
    }
  },
  setup(props) {
    const barStyle = {
      'background-color': `
        rgb(
          ${props.data.color[0]}, 
          ${props.data.color[1]}, 
          ${props.data.color[2]}
        )`,
      'border-radius': '0.25rem',
      'color': 'white',
      'display': 'flex',
      'justify-content': 'end',
      'min-width': '50px',
      'padding-right': '0.25rem',
      'width': `${Math.floor(props.data.percentage * 1000) / 10}%`
    };

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