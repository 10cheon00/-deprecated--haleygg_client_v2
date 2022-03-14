<template>
  <div class="flex justify-content-between" id="selector">
    <div class="font-bold mt-auto mb-auto ml-3">League</div>
    <div id="selector-buttons">
      <Button
        v-for="league in leagueList"
        :key="league"
        :label="league.name"
        :class="{
          'p-button-sm': true,
          'mx-1': true,
          'selected-league': league.id == selectedLeague ? true : false,
        }"
        id="league-button"
        @click="select(league.id)"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, inject } from "vue";

import Button from "primevue/button";

export default defineComponent({
  props: {
    leagueList: {
      type: Array,
      required: true,
    },
  },
  components: {
    Button,
  },
  setup() {
    const selectedLeague = inject("selectedLeague");
    const select = (leagueId) => {
      selectedLeague.value = leagueId;
    };
    return {
      selectedLeague,
      select,
    };
  },
});
</script>

<style scoped>
#selector {
  background-color: #f0f0f0;
  border: 1px solid #dee2e6;
  padding: 0.5rem;
  width: 100%;
}
#selector-buttons {
  overflow-y: auto;
  white-space: nowrap;
}
#selector-title {
  border-right: 1px solid #dee2e6;
}
#league-button {
  flex: 0 0 auto;
  border: 1px solid white;
  background-color: white;
  color: gray;
  border-radius: 3rem;
}
.selected-league {
  border: 1px solid #fea29a !important;
  background-color: #fea29a !important;
  color: white !important;
}
</style>