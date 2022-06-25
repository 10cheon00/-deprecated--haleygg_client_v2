<template>
  <div>
    <BasePageHeader>
      <p class="text-4xl m-4 font-bold">상대 전적 검색</p>
    </BasePageHeader>
    <div class="container p-3">
      <!-- Form -->
      <div class="grid grid-nogutter flex align-items-center" id="form">
        <ValidationWrapper
          class="col-12 md:col-4"
          :errorObj="errorObj.playerName"
        >
          <FormDataListInputField
            :form="state"
            field="playerName"
            datalist="playerList"
            placeholder="플레이어"
          />
          <!-- <ValidationErrorMessage class="w-full my-2" message="존재하지 않는 플레이어입니다." /> -->
        </ValidationWrapper>
        <div
          class="col-12 md:col-1 flex align-items-center justify-content-center"
          id="versus"
        >
          <span>VS</span>
        </div>
        <ValidationWrapper
          class="col-12 md:col-4"
          :errorObj="errorObj.opponentName"
        >
          <FormDataListInputField
            :form="state"
            field="opponentName"
            datalist="playerList"
            placeholder="상대"
          />
          <!-- <ValidationErrorMessage class="w-full my-2" message="존재하지 않는 플레이어입니다." /> -->
        </ValidationWrapper>
        <div class="col-12 md:col-3 flex justify-content-center">
          <Button
            class="flex justify-content-center my-3"
            id="button-compare"
            @click="comparePlayerAndOpponent()"
          >
            <span><i class="pi pi-search" /> 검색</span>
          </Button>
        </div>
        <FormDataList
          v-if="playerList"
          :datalist="playerList"
          datalistId="playerList"
        />
      </div>

      <!-- Result -->
      <BasePanel
        v-if="comparisonResult.hasEverBeenSubmitted"
        class="pt-3"
        header="검색 결과"
        id="result"
      >
        <BaseLoadingContainer :isLoaded="comparisonResult.isFetched">
          <div v-if="comparisonResult.hasError" id="null-data">
            <span>
              {{ comparisonResult.errorMessage }}
            </span>
          </div>
          <div v-else>
            <!-- Profiles -->
            <div class="grid grid-nogutter">
              <!-- Player profile -->
              <div
                class="profile-box profile-player"
                :style="comparisonResult.profiles.player.style"
              >
                <div class="text-4xl font-bold my-1">
                  {{ comparisonResult.profiles.player.name }}
                  <span class="text-xl"
                    >(
                    {{ comparisonResult.profiles.player.favorate_race }} )</span
                  >
                </div>
                <div
                  v-if="
                    comparisonResult.profiles.player.joined_date > '2019-01-01'
                  "
                  class="text-sm text-300"
                >
                  {{
                    convertHyphenWithDateFormat(
                      comparisonResult.profiles.player.joined_date
                    )
                  }}
                  가입
                </div>
              </div>
              <!-- Opponent profile -->
              <div
                class="profile-box profile-opponent"
                :style="comparisonResult.profiles.opponent.style"
              >
                <div class="text-4xl font-bold my-1">
                  {{ comparisonResult.profiles.opponent.name }}
                  <span class="text-xl"
                    >(
                    {{ comparisonResult.profiles.opponent.favorate_race }}
                    )</span
                  >
                </div>
                <div
                  v-if="
                    comparisonResult.profiles.opponent.joined_date >
                    '2019-01-01'
                  "
                  class="text-sm text-300"
                >
                  {{
                    convertHyphenWithDateFormat(
                      comparisonResult.profiles.opponent.joined_date
                    )
                  }}
                  가입
                </div>
              </div>
            </div>
            <!-- Statistics -->
            <table class="w-full text-center" id="statistics">
              <colgroup>
                <col width="30%" />
                <col width="40%" />
                <col width="30%" />
              </colgroup>
              <tbody>
                <tr v-for="item in comparisonResult.statistics" :key="item">
                  <td>
                    {{ item.player }}
                  </td>
                  <td class="label">{{ item.label }}</td>
                  <td>
                    {{ item.opponent }}
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- Timeline -->
            <div class="timeline">
              <ul v-if="comparisonResult.timeline">
                <li
                  v-for="match in comparisonResult.timeline.results"
                  :key="match"
                >
                  <TooltipBox class="information" direction="bottom">
                    <template #content>
                      <div class="date">
                        {{ convertHyphenWithDateFormat(match.date) }}
                      </div>
                      <div class="grid grid-nogutter content">
                        <div class="col-6 league">{{ match.league }}</div>
                        <div class="col-6 map">{{ match.map }}</div>
                        <div class="col-12 title">{{ match.title }}</div>
                      </div>
                      <div
                        :class="{
                          icon: true,
                          left:
                            match.player_tuples[0].winner ==
                            comparisonResult.profiles.player.name,
                          right:
                            match.player_tuples[0].winner !=
                            comparisonResult.profiles.player.name,
                        }"
                      >
                        W
                      </div>
                    </template>
                    <template #tooltip>
                      <div class="grid grid-nogutter">
                        <div class="col-6 league">{{ match.league }}</div>
                        <div class="col-6 map">{{ match.map }}</div>
                        <div class="col-12 title">{{ match.title }}</div>
                      </div>
                    </template>
                  </TooltipBox>
                </li>
              </ul>
            </div>
          </div>
        </BaseLoadingContainer>
      </BasePanel>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive, ref } from "vue";
import Button from "primevue/button";
import ServerApi from "@/api/server/module.js";

import BaseLoadingContainer from "@/components/BaseLoadingContainer.vue";
import BasePageHeader from "@/components/BasePageHeader.vue";
import BasePanel from "@/components/BasePanel.vue";
import FormDataList from "@/components/FormDataList.vue";
import FormDataListInputField from "@/components/FormDataListInputField.vue";
import TooltipBox from "@/components/TooltipBox.vue";
import ValidationWrapper from "@/components/ValidationWrapper.vue";
import {
  convertHyphenWithDateFormat,
  getPercentage,
  getWallpaperUrlByRace,
} from "@/utils/utils.js";
import { Required, Validator } from "@/utils/validator.js";

export default defineComponent({
  components: {
    BaseLoadingContainer,
    BasePageHeader,
    BasePanel,
    Button,
    FormDataList,
    FormDataListInputField,
    TooltipBox,
    ValidationWrapper,
  },
  setup() {
    const playerList = ref(null);
    const state = reactive({
      playerName: "",
      opponentName: "",
    });

    // const PlayerNameInList = (state) => {
    //   const isPlayerNameInList =
    //     playerList.value.filter((player) => {
    //       return player.name.toLowerCase() == state.toLowerCase();
    //     }).length > 0;
    //   if (isPlayerNameInList) {
    //     return false;
    //   }
    //   return "존재하지 않는 플레이어입니다.";
    // };

    const rules = {
      playerName: { Required /*PlayerNameInList*/ },
      opponentName: { Required /*PlayerNameInList*/ },
    };

    const validator = new Validator(state, rules);
    const errorObj = validator.errorObj;

    const comparisonResult = reactive({
      player: null,
      opponent: null,
      statistics: null,
      timeline: null,
      isFetched: false,
      hasError: false,
      hasEverBeenSubmitted: false,
      errorMessage: "",
    });

    const comparePlayerAndOpponent = () => {
      validator.validate();
      if (validator.hasError()) {
        return;
      }

      comparisonResult.hasEverBeenSubmitted = true;
      fetchInformationAndGetResult();
    };

    const fetchInformationAndGetResult = async () => {
      comparisonResult.isFetched = false;

      try {
        // fetch player and opponent profile.
        const fetchedInformation = {};
        let response = await ServerApi.fetchPlayerDetail(state.playerName);
        fetchedInformation.playerProfile = response.data;
        response = await ServerApi.fetchPlayerDetail(state.opponentName);
        fetchedInformation.opponentProfile = response.data;

        // fetch player and opponent statistics.
        response = await ServerApi.fetchPlayerStatistics(state.playerName);
        fetchedInformation.playerStatistics = response.data;
        response = await ServerApi.fetchPlayerStatistics(state.opponentName);
        fetchedInformation.opponentStatistics = response.data;

        // fetch player and opponent win rate
        response = await ServerApi.fetchPlayerStatisticsAgainstOpponent(
          fetchedInformation.playerProfile.name,
          fetchedInformation.opponentProfile.name
        );
        fetchedInformation.statisticsBetweenPlayers = response.data;

        // fetch matches related both players
        response = await ServerApi.fetchPlayerMatches(
          [
            fetchedInformation.playerProfile.name,
            fetchedInformation.opponentProfile.name,
          ],
          null,
          null,
          null,
          "melee"
        );
        fetchedInformation.timeline = response.data;

        createComparisonResultFromParsedInformation(fetchedInformation);

        comparisonResult.hasError = false;
        comparisonResult.errorMessage = "";
      } catch (err) {
        if (err.response.status === 404) {
          comparisonResult.hasError = true;
          comparisonResult.errorMessage = "플레이어 정보를 찾을 수 없습니다.";
        }
      }
      comparisonResult.isFetched = true;
    };

    const createComparisonResultFromParsedInformation = (
      fetchedInformation
    ) => {
      comparisonResult.player = {};
      comparisonResult.opponent = {};
      comparisonResult.profiles = {
        player: fetchedInformation.playerProfile,
        opponent: fetchedInformation.opponentProfile,
      };

      comparisonResult.profiles.player.style = {
        "background-image": `
          linear-gradient(45deg, #00000000, #000000ff 75%),
          url(
            ${getWallpaperUrlByRace(
              fetchedInformation.playerProfile.favorate_race
            )}
          )`,
        "background-position": "top",
        "background-repeat": "no-repeat",
        "background-size": "cover",
      };
      comparisonResult.profiles.opponent.style = {
        "background-image": `
          linear-gradient(225deg, #00000000, #000000ff 75%),
          url(
            ${getWallpaperUrlByRace(
              fetchedInformation.opponentProfile.favorate_race
            )}
          )`,
        "background-position": "top",
        "background-repeat": "no-repeat",
        "background-size": "cover",
      };
      comparisonResult.statistics = [
        {
          label: "통산 승률",
          player: `${getPercentage(
            fetchedInformation.playerStatistics.winning_melee_matches_count,
            fetchedInformation.playerStatistics.losing_melee_matches_count
          )}%`,
          opponent: `${getPercentage(
            fetchedInformation.opponentStatistics.winning_melee_matches_count,
            fetchedInformation.opponentStatistics.losing_melee_matches_count
          )}%`,
        },
        {
          label: "상대 종족에 대한 승률",
          player: getWinningRateFromStatisticsByRace(
            fetchedInformation.playerStatistics,
            fetchedInformation.playerProfile.favorate_race,
            fetchedInformation.opponentProfile.favorate_race
          ),
          opponent: getWinningRateFromStatisticsByRace(
            fetchedInformation.opponentStatistics,
            fetchedInformation.opponentProfile.favorate_race,
            fetchedInformation.playerProfile.favorate_race
          ),
        },
        {
          label: "상대 전적",
          player: `${fetchedInformation.statisticsBetweenPlayers.win_count}승 ${fetchedInformation.statisticsBetweenPlayers.lose_count}패`,
          opponent: `${fetchedInformation.statisticsBetweenPlayers.lose_count}승 ${fetchedInformation.statisticsBetweenPlayers.win_count}패`,
        },
        {
          label: "상대 승률",
          player: `${getPercentage(
            fetchedInformation.statisticsBetweenPlayers.win_count,
            fetchedInformation.statisticsBetweenPlayers.lose_count
          )}%`,
          opponent: `${getPercentage(
            fetchedInformation.statisticsBetweenPlayers.lose_count,
            fetchedInformation.statisticsBetweenPlayers.win_count
          )}%`,
        },
      ];

      comparisonResult.timeline = fetchedInformation.timeline;
    };

    const getWinningRateFromStatisticsByRace = (
      statistics,
      playerRace,
      opponentRace
    ) => {
      if (playerRace == "" || opponentRace == "") {
        return "-";
      }
      const keyMap = {
        P: {
          P: [
            "protoss_wins_to_protoss_count",
            "protoss_loses_to_protoss_count",
          ],
          T: ["protoss_wins_to_terran_count", "protoss_loses_to_terran_count"],
          Z: ["protoss_wins_to_zerg_count", "protoss_loses_to_zerg_count"],
        },
        T: {
          P: ["terran_wins_to_protoss_count", "terran_loses_to_protoss_count"],
          T: ["terran_wins_to_terran_count", "terran_loses_to_terran_count"],
          Z: ["terran_wins_to_zerg_count", "terran_los`es_to_zerg_count"],
        },
        Z: {
          P: ["zerg_wins_to_protoss_count", "zerg_loses_to_protoss_count"],
          T: ["zerg_wins_to_terran_count", "zerg_loses_to_terran_count"],
          Z: ["zerg_wins_to_zerg_count", "zerg_loses_to_zerg_count"],
        },
      };

      return `vs ${opponentRace} / 
      ${getPercentage(
        statistics[keyMap[playerRace][opponentRace][0]],
        statistics[keyMap[playerRace][opponentRace][1]]
      )}%`;
    };

    onMounted(async () => {
      const response = await ServerApi.fetchPlayerList();
      playerList.value = response.data;
    });

    return {
      comparisonResult,
      state,
      errorObj,
      playerList,

      convertHyphenWithDateFormat,
      comparePlayerAndOpponent,
    };
  },
});
</script>
<style scoped>
#button-compare {
  width: 8rem;
  height: 4rem;
}

#form {
  min-height: 10rem;
}

#null-data {
  min-height: 20rem;
  color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
}

#versus {
  min-height: 2rem;
}

#result {
  border-top: 1px solid #dee2e6;
}

#statistics tr {
  border-bottom: 1px solid #dee2e6;
}

#statistics td {
  height: 2rem;
  vertical-align: middle;
}

#statistics .label {
  background-color: #f0f2f4;
  border-right: 1px solid #dee2e6;
  border-left: 1px solid #dee2e6;
  overflow-wrap: break-word;
}

.profile-box {
  min-height: 10rem;
  color: white;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  width: 50%;
  justify-content: center;
}

.profile-box.profile-player {
  align-items: start;
  padding-left: 5rem;
}

.profile-box.profile-opponent {
  align-items: end;
  padding-right: 5rem;
}

@media screen and (max-width: 768px) {
  .profile-box {
    min-height: 8rem;
    width: 100%;
  }

  .profile-box.profile-player {
    padding-left: 3rem;
  }

  .profile-box.profile-opponent {
    padding-right: 3rem;
  }
}

.timeline {
  --timeline-vertical-line-length: 30px;
  --timeline-item-border-length: 5px;
}

.timeline ul {
  padding: 1rem;
}

/* ------------ Timeline item ------------ */
.timeline ul li {
  background: #f0f0f0;
  border: var(--timeline-item-border-length) solid #dee2e6;
  border-radius: 15px;
  list-style-type: none;
  margin: 0 auto;
  margin-bottom: var(--timeline-vertical-line-length);
  width: 50%;
  text-align: center;
  position: relative;
}

/* ------------ Vertical line ------------ */
.timeline ul li::after {
  background: #dee2e6;
  content: "";
  width: 6px;
  height: calc(
    var(--timeline-vertical-line-length) + var(--timeline-item-border-length)
  );
  position: absolute;
  left: calc(50% - 3px);
  z-index: 1;
}

/* ------------ Winner icon layout ------------ */
.timeline ul li .information .icon {
  --winner-icon-size: 30px;
  background: white;
  border-radius: 50%;
  border: 5px solid #04e03b;
  width: var(--winner-icon-size);
  height: var(--winner-icon-size);
  position: absolute;
  top: calc(50% - var(--winner-icon-size) / 2);
}

/* ------------ Winner icon style ------------ */
.timeline ul li .information .icon {
  color: #04e03b;
  font-size: calc(var(--winner-icon-size) / 3);
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timeline ul li .information .icon.left {
  left: calc((var(--winner-icon-size) + 15px) * -1);
}

.timeline ul li .information .icon.right {
  right: calc((var(--winner-icon-size) + 15px) * -1);
}

/* ------------ Timeline item information ------------ */
.timeline ul li .information {
  color: black;
}

.timeline ul li .information .date {
  border-radius: 10px 10px 0 0;
  padding: 0.25rem 0;
  background: white;
}
.timeline ul li .information .league,
.timeline ul li .information .map,
.timeline ul li .information .title {
  font-size: 0.75rem;
}

.timeline ul li .information .league {
  border-right: 1px dashed #c7c7c7;
}

.timeline ul li .information .title {
  border-top: 1px dashed #c7c7c7;
  color: #7c7c7c;
  font-size: 0.75rem;
}

@media screen and (max-width: 768px) {
  .timeline ul li .information .date {
    border-radius: 10px;
  }

  .timeline ul li .information .content .league,
  .timeline ul li .information .content .map,
  .timeline ul li .information .content .title {
    display: none;
    visibility: hidden;
  }
}
</style>