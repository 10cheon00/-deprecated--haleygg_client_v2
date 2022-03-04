<template>
  <div>
    <!-- Match result list -->
    <div
      v-for="(matchResult, index) in matchResultListRef"
      :key="index"
      class="
        align-content-center align-items-center
        grid grid-nogutter
        text-center
      "
      id="match-result"
      :style="{
        'background-color': (() => {
          if (matchResult.isWonMatch !== undefined) {
            if (matchResult.isWonMatch) {
              return '#b3d0ff';
            } else {
              return '#ffb3b3';
            }
          }
          return '#d7d9db';
        })(),
        'margin-bottom':
          index < matchResultList.length - 1 ? '0.25rem' : 'none',
      }"
    >
      <div class="col-3">
        <div id="match-result-league">
          {{ matchResult.league }} {{ matchResult.title }}
        </div>
        <div class="mt-1" id="match-result-date">{{ matchResult.date }}</div>
      </div>

      <div class="col-6">
        <div
          v-for="player_tuple in matchResult.player_tuples"
          :key="player_tuple"
          class="grid grid-nogutter"
        >
          <div class="col-6">
            {{ player_tuple.winner }} ( {{ player_tuple.winner_race }} )
          </div>
          <div class="col-6">
            {{ player_tuple.loser }} ( {{ player_tuple.loser_race }} )
          </div>
        </div>
      </div>

      <div class="col-1 text-lg font-bold" id="match-result-map">
        {{ matchResult.map }}
      </div>
      <div class="col-2" id="match-result-miscellaneous">
        {{ matchResult.miscellaneous }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  props: {
    matchResultList: {
      required: true,
      type: Array,
    },
    resultListOwnerName: {
      required: false,
      type: String,
    },
  },
  setup(props) {
    const matchResultListRef = computed(() => {
      if (props.resultListOwnerName == undefined) {
        return props.matchResultList;
      }

      props.matchResultList.forEach((matchResult) => {
        if (
          matchResult.player_tuples.some(
            (player_tuple) => player_tuple.winner == props.resultListOwnerName
          )
        ) {
          matchResult["isWonMatch"] = true;
        } else {
          matchResult["isWonMatch"] = false;
        }
      });

      return props.matchResultList;
    });

    return {
      matchResultListRef,
    };
  },
});
</script>

<style scoped>
#match-result {
  height: 5rem;
}
#match-result-date {
  font-size: 0.5rem;
  color: gray;
}
</style>