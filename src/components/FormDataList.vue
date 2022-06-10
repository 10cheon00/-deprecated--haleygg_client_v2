<template>
  <datalist class="datalist" :id="datalistId">
    <option v-for="item in datalist" :key="item" :value="item.name">
      {{ item.name }}
    </option>
  </datalist>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    datalist: {
      type: Array,
      required: true,
    },
    datalistId: {
      type: String,
      required: true,
    },
  },
  setup() {},
});
</script>
