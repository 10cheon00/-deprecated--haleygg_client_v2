<template>
  <div>
    <!-- Match result list -->
    <div
      v-for="(matchResult, index) in matchResultListRef"
      :key="index"
      :class="{
        'match-result': true,
        'match-result-win': matchResult.isWonMatch,
        'match-result-lose': !matchResult.isWonMatch,
      }"
    >
      <!-- Date, League, Title -->
      <div
        :class="{
          'grid grid-nogutter': true,
          'justify-content-start': true,
          'match-result-header': true,
        }"
      >
        <!-- Date -->
        <div class="col-6 md:col-2 match-result-date">
          {{ convertHyphenWithDateFormat(matchResult.date) }}
        </div>

        <!-- League -->
        <div class="col-6 md:col-2 match-result-league">
          {{ matchResult.league }}
        </div>

        <!-- Title -->
        <div class="col-12 md:col-8 match-result-title">
          {{ matchResult.title }}
        </div>
      </div>

      <!-- Players, Map -->
      <div
        class="grid grid-nogutter align-items-center match-result-detail p-1"
      >
        <!-- Map -->
        <div class="col-3 text-lg text-center" id="match-result-map">
          {{ matchResult.map }}
        </div>

        <!-- Winner -->
        <div class="col-3 flex-none">
          <div
            v-for="player_tuple in matchResult.player_tuples"
            :key="player_tuple"
          >
            <span
              :class="{
                'mr-auto': true,
                'cursor-pointer': true,
                'font-bold':
                  resultListOwnerName == player_tuple.winner ? true : false,
              }"
              @click="routeToPlayerInformation(router, player_tuple.winner)"
            >
              {{ player_tuple.winner }}
              <span
                v-if="player_tuple.winner_race"
                class="match-player-race text-block"
              >
                ( {{ player_tuple.winner_race }} )
              </span>
            </span>
          </div>
        </div>

        <!-- Loser -->
        <div class="col-3 flex-none">
          <div
            v-for="player_tuple in matchResult.player_tuples"
            :key="player_tuple"
          >
            <span
              :class="{
                'mr-auto': true,
                'cursor-pointer': true,
                'font-bold':
                  resultListOwnerName == player_tuple.loser ? true : false,
              }"
              @click="routeToPlayerInformation(router, player_tuple.loser)"
            >
              {{ player_tuple.loser }}
              <span
                v-if="player_tuple.loser_race"
                class="match-player-race text-block"
              >
                ( {{ player_tuple.loser_race }} )
              </span>
            </span>
          </div>
        </div>

        <!-- Miscellaneous -->
        <div class="col-3 match-result-miscellaneous">
          {{ matchResult.miscellaneous }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";

import {
  convertHyphenWithDateFormat,
  routeToPlayerInformation,
} from "@/utils/utils.js";
import { useRouter } from "vue-router";

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
    const router = useRouter();

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
      router,
      matchResultListRef,

      convertHyphenWithDateFormat,
      routeToPlayerInformation,
    };
  },
});
</script>

<style scoped>
:root {
  --win-border-color: #77abff;
  --lose-border-color: #ff836d;
}

.match-result {
  background-color: #f0f0f0;
  margin-bottom: 0.25rem;
  padding: 0;
}

.match-result * {
  white-space: nowrap;
}

.match-result:last-child {
  margin-bottom: 0;
}

.match-result-date {
  font-size: small;
  color: gray;
}

.match-result-detail {
  min-height: 80px;
}

.match-result-header > div {
  padding: 0.5rem 1rem;
}

.match-result-title {
  font-size: small;
}

.match-result-win {
  background-color: #b3d0ff;
}

.match-result-win .match-result-detail {
  background-color: #95beff;
}

.match-result-win .match-result-league {
  border-right: 1px dashed #77abff;
  border-left: 1px dashed #77abff;
}

.match-result-lose {
  background-color: #ffb3b3;
}

.match-result-lose .match-result-detail {
  background-color: #ff9e9e;
}

.match-result-lose .match-result-league {
  border-right: 1px dashed #ff836d;
  border-left: 1px dashed #ff836d;
}

@media (max-width: 768px) {
  .match-result-win .match-result-date {
    border-bottom: 1px dashed #77abff;
  }

  .match-result-win .match-result-league {
    border-right: none;
    border-bottom: 1px dashed #77abff;
  }

  .match-result-lose .match-result-date {
    border-bottom: 1px dashed #ff836d;
  }

  .match-result-lose .match-result-league {
    border-right: none;
    border-bottom: 1px dashed #ff836d;
  }
}

.match-player-race {
  font-size: 0.5rem;
  vertical-align: middle;
}
</style>