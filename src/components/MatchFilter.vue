<template>
  <div>
    <div class="flex justify-content-center px-3" id="league-type-filter">
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
    <div
      v-if="filter.filteredleagueList.length > 0 || filter.mapList"
      class="container p-3"
    >
      <div id="filter">
        <div v-if="filter.filteredleagueList.length > 0" id="league-filter">
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
        <div v-if="filter.mapList" id="map-filter">
          <select v-model="filter.selectedMap" required>
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
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, inject, reactive } from "vue";

export default defineComponent({
  props: {
    leagueList: {
      type: Array,
      required: false,
    },
    mapList: {
      type: Array,
      required: false,
    },
    disableTotalLeagueType: {
      type: Boolean,
      required: false,
      default: () => {
        return false;
      },
    },
    disableTotalLeague: {
      type: Boolean,
      required: false,
      default: () => {
        return false;
      },
    },
    disableTotalMap: {
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
      selectedLeagueType: inject("selectedLeagueType"),
      filteredleagueList: null,
    });
    if (props.leagueList) {
      filter.selectedLeague = inject("selectedLeague");
    }
    if (props.mapList) {
      filter.selectedMap = inject("selectedMap");
    }

    filter.filteredleagueList = computed(() => {
      if (!props.leagueList) {
        return;
      }

      if (!filter.selectedLeagueType) {
        return [];
      }

      // deep copy
      let result = JSON.parse(JSON.stringify(filter.leagueList));
      result = result.filter((item) => {
        return item.type == filter.selectedLeagueType;
      });

      // extract season string
      result.forEach((item) => {
        console.log(item.label);
        item.label = /S[0-9]+$/g.exec(item.label)[0];
      });

      // unshift Total button
      if (!props.disableTotalLeague) {
        result.unshift({
          label: "Total",
          value: undefined,
        });
      }
      return result;
    });

    if (!props.disableTotalMap) {
      if (filter.mapList) {
        filter.mapList.unshift({
          label: "Total",
          value: undefined,
        });
      }
    }

    const typeList = [
      {
        label: "프로리그",
        value: "proleague",
      },
      {
        label: "스타리그",
        value: "starleague",
      },
    ];
    if (!props.disableTotalLeagueType) {
      typeList.unshift({
        label: "Total",
        value: undefined,
      });
    }

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

#filter {
  background-color: #f0f0f0;
  border: 1px solid #dee2e6;
}

#league-filter {
  border-bottom: 1px solid #dee2e6;
  display: flex;
  overflow-y: auto;
  white-space: nowrap;
  padding: 0.5rem 0;
  margin: 0 0.5rem;
  align-items: center;
}

#league-filter .button {
  background-color: white;
  border-radius: 1.5rem;
  color: #c25e53;
  font-size: 0.9rem;
  height: 28px;
  margin: 0 0.25rem;
  padding: 0.25rem 1rem;
  text-align: center;
}

#league-filter .button.active {
  background-color: #fd7f71;
  color: white;
}

#map-filter {
  display: flex;
  margin: 0.5rem;
}

#map-filter select {
  flex-grow: 1;
  padding: 0.5rem;
}

#map-filter option[disabled] {
  display: none;
}
</style>