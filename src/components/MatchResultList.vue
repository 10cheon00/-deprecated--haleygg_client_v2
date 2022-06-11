<template>
  <div>
    <!-- Match result list -->
    <div
      v-for="(matchResult, index) in matchResultListRef"
      :key="index"
      :class="{
        'match-result': true,
        'match-result-none': !resultListOwnerName,
        'match-result-win': resultListOwnerName && matchResult.isWonMatch,
        'match-result-lose': resultListOwnerName && !matchResult.isWonMatch,
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
        class="grid grid-nogutter align-items-center p-0 match-result-detail"
      >
        <!-- Map -->
        <div class="col-2 text-sm match-result-map">
          {{ matchResult.map }}
        </div>

        <!-- Winner -->
        <div class="col-4 flex-none">
          <div
            v-for="player_tuple in matchResult.player_tuples"
            :key="player_tuple"
          >
            <span
              :class="{
                'mr-auto': true,
                'cursor-pointer': true,
                'match-player': true,
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
        <div class="col-4 flex-none">
          <div
            v-for="player_tuple in matchResult.player_tuples"
            :key="player_tuple"
          >
            <span
              :class="{
                'mr-auto': true,
                'cursor-pointer': true,
                'text-300': true,
                'font-bold':
                  resultListOwnerName == player_tuple.loser ? true : false,
                'match-player': true,
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
        <div class="col-2 match-result-miscellaneous">
          {{ matchResult.miscellaneous }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useRouter } from "vue-router";

import {
  convertHyphenWithDateFormat,
  routeToPlayerInformation,
} from "@/utils/utils.js";
import "@/css/color.css";

export default defineComponent({
  props: {
    matchResultList: {
      required: true,
      type: Array,
    },
    resultListOwnerName: {
      required: false,
      type: String,
      default: () => {
        return undefined;
      },
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
.match-result {
  background-color: #f0f0f0;
  margin-bottom: 0.5rem;
}

.match-result:last-child {
  margin-bottom: 0;
}

.match-result-date {
  font-size: small;
  text-align: center;
}

.match-result-detail {
  min-height: 80px;
  text-align: center;
}

.match-result-header > div {
  padding: 0.5rem 1rem;
}

.match-result-league {
  text-align: center;
}

.match-result-map {
  border-right: 1px dashed #c5c5c5;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: inherit;
}

.match-result-miscellaneous {
  min-height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px dashed #c5c5c5;
}

.match-result-title {
  color: gray;
  font-size: small;
}

.match-result-none {
  background-color: #fef4e7;
}

.match-result-none .match-result-date {
  border-right: 1px dashed #3e3e3e;
  border-bottom: 1px dashed #3e3e3e;
}

/* Not provide match result owner */
.match-result-none .match-result-header {
  background-color: #fad49e;
}

.match-result-none .match-result-league {
  border-bottom: 1px dashed #3e3e3e;
}

@media (min-width: 768px) {
  .match-result-none .match-result-date {
    border-bottom: none;
  }

  .match-result-none .match-result-league {
    border-right: 1px dashed #3e3e3e;
    border-bottom: none;
  }
}

/* Provided match result owner */
.match-result-win {
  background-color: #e6efff;
}

.match-result-win .match-result-date {
  border-right: 1px dashed rgb(var(--win-color));
  border-bottom: 1px dashed rgb(var(--win-color));
}

.match-result-win .match-result-header {
  background-color: #b3d0ff;
}

.match-result-win .match-result-league {
  border-bottom: 1px dashed rgb(var(--win-color));
}

.match-result-lose {
  background-color: #ffe6e6;
}

.match-result-lose .match-result-date {
  border-right: 1px dashed rgb(var(--lose-color));
  border-bottom: 1px dashed rgb(var(--lose-color));
}

.match-result-lose .match-result-header {
  background-color: #ffb3b3;
}

.match-result-lose .match-result-league {
  border-bottom: 1px dashed rgb(var(--lose-color));
}

@media (min-width: 768px) {
  .match-result-win .match-result-date {
    border-bottom: none;
  }

  .match-result-win .match-result-league {
    border-right: 1px dashed rgb(var(--win-color));
    border-bottom: none;
  }

  .match-result-lose .match-result-date {
    border-bottom: none;
  }

  .match-result-lose .match-result-league {
    border-right: 1px dashed rgb(var(--lose-color));
    border-bottom: none;
  }
}
.match-player {
  white-space: nowrap;
}

.match-player-race {
  font-size: 0.5rem;
  vertical-align: middle;
}
</style>