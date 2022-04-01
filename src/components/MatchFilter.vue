<template>
  <div id="filter">
    <div class="container flex justify-content-between px-3">
      <div v-if="filter.leagueList" id="league-filter">
        <div
          v-for="league in filter.leagueList"
          :key="league"
          :class="{
            'cursor-pointer': true,
            'selected-league':
              league.id == filter.selectedLeague ? true : false,
            'league-filter-button': true,
          }"
          @click="select(league.id)"
        >
          {{ league.name }}
        </div>
      </div>
      <select
        v-if="filter.mapList"
        v-model="filter.selectedMap"
        id="map-filter"
        required
      >
        <option selected disabled :value="null">맵 선택</option>
        <option
          v-for="map in filter.mapList"
          :key="map"
          class="maplist-item"
          :label="map.name"
          :value="map.id"
        />
      </select>
    </div>
  </div>
</template>

<script>
import { defineComponent, inject, reactive } from "vue";

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
    enableTotalLeague: {
      type: Boolean,
      required: false,
      default: () => {
        return false;
      },
    },
    enableTotalMap: {
      type: Boolean,
      required: false,
      default: () => {
        return false;
      },
    },
  },
  setup(props) {
    const filter = reactive({
      leagueList: props.leagueList,
      mapList: props.mapList,
      selectedLeague: undefined,
      selectedMap: undefined,
    });
    if (filter.leagueList) {
      filter.selectedLeague = inject("selectedLeague");
      if (props.enableTotalLeague) {
        filter.leagueList.push({
          id: undefined,
          name: "Total",
        });
      }
    }
    if (filter.mapList) {
      filter.selectedMap = inject("selectedMap");
      if (props.enableTotalMap) {
        filter.mapList.push({
          id: undefined,
          name: "Total",
        });
      }
    }
    const select = (leagueId) => {
      filter.selectedLeague = leagueId;
    };
    return {
      filter,
      select,
    };
  },
});
</script>

<style scoped>
#filter {
  background-color: #404040;
}

#league-filter {
  display: flex;
  margin-right: auto;
  overflow-y: auto;
  white-space: nowrap;
}

.league-filter-button {
  color: white;
  padding: 1.5rem;
}

#map-filter {
  background-color: #404040;
  border: 1px solid white;
  color: white;
  margin: auto 0 auto 1rem;
  max-width: 8rem;
  padding: 0.5rem;
  vertical-align: baseline;
}

#map-filter option[disabled] {
  display: none;
}

@media (max-width: 768px) {
  .league-filter-button {
    padding: 0.75rem;
  }
  #map-filter {
    margin-left: 0.25rem;
  }
}

.selected-league {
  background-color: white;
  color: black;
  font-weight: bolder;
}
</style>