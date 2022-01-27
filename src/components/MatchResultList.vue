<template>
  <div>
    <!-- Match result list -->
    <div
      class="
        align-content-center align-items-center
        grid grid-nogutter
        text-center
      "
      id="match-result"
      v-for="(matchResult, index) in matchResultList"
      :key="index"
      :style="{
        'background-color': (() => {
          if(matchResult.isWonMatch !== undefined){
            if(matchResult.isWonMatch){
              return '#b3d0ff';
            }
            else{
              return '#ffb3b3';
            }
          }
          return '#d7d9db';
        })(),
        'margin-bottom': index < matchResultList.length - 1 ? '0.25rem' : 'none',
      }"
    >
      <div class="col-3">
        <div id="match-result-league">
          {{ matchResult.league }} {{ matchResult.title }}
        </div>
        <div class="mt-1" id="match-result-date">{{ matchResult.date }}</div>
      </div>
      <div class="col-3">
        <div v-for="winner in matchResult.winners" :key="winner.name">
          {{ winner.name }} ( {{ winner.race }} )
        </div>
      </div>
      <div class="col-1 text-lg font-bold" id="match-result-map">{{ matchResult.map }}</div>
      <div class="col-3">
        <div v-for="loser in matchResult.losers" :key="loser.name">
          {{ loser.name }} ( {{ loser.race }} )
        </div>
      </div>
      <div class="col-2" id="match-result-miscellaneous">
        {{ matchResult.miscellaneous }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

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
    const highlightAllWonMatches = () => {
      props.matchResultList.forEach((matchResult) => {
        if (matchResult.winners.some(
          (winner) => winner.name == props.resultListOwnerName
        )) {
          matchResult["isWonMatch"] = true;
        } else {
          matchResult["isWonMatch"] = false;
        }
      });
    };
    
    if (props.resultListOwnerName !== undefined) {
      highlightAllWonMatches();
    }

  },
});
</script>

<style scoped>
#match-result {
  height: 4rem;
}
#match-result-date {
  font-size: 0.5rem;
  color: gray;
}
</style>