<template>
  <div id="selector">
    <div class="container flex justify-content-between px-3">
      <div id="selector-buttons">
        <div
          v-for="league in leagueList"
          :key="league"
          :class="{
            'selected-league': league.id == selectedLeague ? true : false,
            'selector-button': true,
          }"
          @click="select(league.id)"
        >
          {{ league.name }}
        </div>
      </div>
      <Dropdown
        v-if="mapList"
        v-model="selectedMap"
        id="selector-dropdown"
        placeholder="맵 선택"
        optionLabel="name"
        optionValue="id"
        :options="mapList"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, inject } from "vue";

import Dropdown from "primevue/dropdown";

export default defineComponent({
  props: {
    leagueList: {
      type: Array,
      required: true,
    },
    mapList: {
      type: Array,
      required: false,
    },
  },
  components: {
    Dropdown,
  },
  setup(props) {
    const selectedLeague = inject("selectedLeague");
    let selectedMap = null;
    if (props.mapList) {
      selectedMap = inject("selectedMap");
    }
    const select = (leagueId) => {
      selectedLeague.value = leagueId;
    };
    return {
      selectedLeague,
      selectedMap,
      select,
    };
  },
});
</script>

<style scoped>
#selector {
  background-color: #404040;
}

#selector-buttons {
  display: flex;
  margin-right: auto;
  overflow-y: auto;
  white-space: nowrap;
}

#selector-dropdown {
  margin: auto 0 auto 1rem;
  border-radius: 0;
  background-color: #404040;
}

.selector-button {
  color: white;
  padding: 1.5rem;
}

@media (max-width: 768px) {
  .selector-button {
    padding: 0.75rem;
  }
}

.selected-league {
  background-color: white;
  color: black;
  font-weight: bolder;
}
</style>