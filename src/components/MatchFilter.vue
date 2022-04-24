<template>
  <div id="filter">
    <div
      class="container flex justify-content-center px-3"
      id="league-type-filter"
    >
      <div
        v-for="type in typeList"
        :key="type"
        :class="{
          button: true,
          active: type.value == filter.selectedLeagueType,
        }"
        @click="selectLeagueType(type)"
      >
        <div>{{ type.label }}</div>
      </div>
    </div>
    <div class="container flex justify-content-center p-3">
      <div v-if="filter.filteredleagueList" id="league-filter">
        <div
          v-for="league in filter.filteredleagueList"
          :key="league"
          :class="{
            active: league.name == filter.selectedLeague ? true : false,
            button: true,
          }"
          @click="selectLeague(league.name)"
        >
          {{ league.label }}
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
          :label="map.label"
          :value="map.name"
        />
      </select>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, inject, reactive } from "vue";

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
      selectedLeague: inject("selectedLeague"),
      selectedMap: inject("selectedMap"),
      selectedLeagueType: inject("selectedLeagueType"),
    });

    filter.filteredleagueList = computed(() => {
      if (!filter.selectedLeagueType) {
        return [
          {
            label: "Total",
            value: undefined,
          },
        ];
      }

      // deep copy
      let result = JSON.parse(JSON.stringify(filter.leagueList));
      result = result.filter((item) => {
        return item.type == filter.selectedLeagueType;
      });
      if (props.enableTotalLeague) {
        result.unshift({
          label: "Total",
          value: undefined,
        });
      }
      return result;
    });

    if (props.enableTotalMap) {
      filter.mapList.unshift({
        label: "Total",
        value: undefined,
      });
      filter.selectedMap = undefined;
    }

    const typeList = [
      {
        label: "Total",
        value: undefined,
      },
      {
        label: "프로리그",
        value: "proleague",
      },
      {
        label: "스타리그",
        value: "starleague",
      },
    ];

    const selectLeague = (leagueName) => {
      filter.selectedLeague = leagueName;
    };

    const selectLeagueType = (type) => {
      filter.selectedLeagueType = type.value;
      filter.selectedLeague = undefined;
    };

    return {
      filter,
      typeList,
      selectLeague,
      selectLeagueType,
    };
  },
});
</script>

<style scoped>
::-webkit-scrollbar {
  height: 8px;
}

::-webkit-scrollbar-thumb {
  background: #f4f4f4aa;
  border: 0px;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #f4f4f4ff;
}

::-webkit-scrollbar-thumb:active {
  background: #f4f4f488;
}

#filter {
  background-color: white;
}

#league-type-filter {
  background-color: #404040;
  display: flex;
  margin-right: auto;
  overflow-y: auto;
  white-space: nowrap;
}

#league-type-filter .button {
  color: white;
  padding: 1.5rem;
  cursor: pointer;
}

#league-type-filter .button.active {
  background-color: white;
  color: black;
}

#league-filter {
  display: flex;
  margin-right: auto;
  overflow-y: auto;
  white-space: nowrap;
}

#league-filter .button {
  border-radius: 1.5rem;
  background-color: #e9e9e9;
  color: #8d8d8d;
  text-align: center;
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
}

#league-filter .button.active {
  background-color: #404040;
  color: white;
}

@media (max-width: 768px) {
  .league-filter .button {
    padding: 0.75rem;
  }
}

#map-filter {
  border: 1px solid #a6a9ac;
  margin: auto 0 auto 1rem;
  max-width: 8rem;
  padding: 0.5rem;
  vertical-align: baseline;
}

#map-filter option[disabled] {
  display: none;
}

@media (max-width: 768px) {
  #map-filter {
    margin-left: 0.25rem;
  }
}
</style>