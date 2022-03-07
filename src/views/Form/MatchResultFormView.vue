<template>
  <div v-if="clanData" class="p-3">
    <div
      v-for="(matchResultForm, matchResultFormIndex) in matchResultFormList"
      :key="matchResultFormIndex"
      class="pb-3"
    >
      <StripePanel header="New Match Result">
        <div class="grid grid-nogutter">
          <!-- League information -->
          <div
            class="col-12 lg:col-4 grid grid-nogutter align-content-start p-3"
            id="match-information"
          >
            <div class="col-12 text-xl mb-3" id="form-header">게임 정보</div>

            <!-- League -->
            <div class="col-12 flex align-items-center my-2">
              <label id="form-label">리그</label>
              <DropDown
                v-model="matchResultForm.league"
                class="flex-grow-1 flex"
                optionLabel="name"
                optionValue="name"
                :options="clanData.leagueList"
              />
            </div>

            <!-- Title -->
            <div class="col-12 flex align-items-center my-2">
              <label id="form-label">게임 제목</label>
              <InputText
                v-model="matchResultForm.title"
                class="flex-grow-1 flex"
                type="text"
              />
            </div>

            <!-- Date -->
            <div class="col-12 flex align-items-center my-2">
              <label id="form-label">날짜</label>
              <Calendar
                v-model="matchResultForm.date"
                class="flex-grow-1 flex"
                dateFormat="yy-mm-dd"
              />
            </div>

            <!-- Map -->
            <div class="col-12 flex align-items-center my-2">
              <label id="form-label">맵</label>
              <DropDown
                v-model="matchResultForm.map"
                class="flex-grow-1 flex"
                optionLabel="name"
                optionValue="name"
                :options="clanData.mapList"
              />
            </div>
          </div>

          <!-- Players -->
          <div
            class="col-12 lg:col-8 grid grid-nogutter align-content-start p-3"
          >
            <div class="col-12 text-xl mb-3" id="form-header">
              플레이어 정보
            </div>
            <div
              v-for="(
                player_tuples, playerIndex
              ) in matchResultForm.player_tuples"
              :key="playerIndex"
              class="col-12 flex"
            >
              <div class="flex flex-grow-1 grid grid-nogutter">
                <div class="col-12 flex">
                  <div class="flex flex-grow-1 align-items-center my-2">
                    <label id="form-label">승리자</label>
                    <DropDown
                      v-model="player_tuples.winner"
                      class="mx-3 w-full"
                      optionLabel="name"
                      optionValue="name"
                      :options="clanData.playerList"
                    />
                  </div>
                  <div class="flex justify-content-center my-2">
                    <SelectButton
                      v-model="player_tuples.winner_race"
                      optionLabel="race"
                      optionValue="value"
                      :options="raceList"
                    />
                  </div>
                </div>
                <div class="col-12 flex">
                  <div class="flex flex-grow-1 align-items-center my-2">
                    <label id="form-label">패배자</label>
                    <DropDown
                      v-model="player_tuples.loser"
                      class="mx-3 w-full"
                      optionLabel="name"
                      optionValue="name"
                      :options="clanData.playerList"
                    />
                  </div>
                  <div class="flex justify-content-center my-2">
                    <SelectButton
                      v-model="player_tuples.loser_race"
                      optionLabel="race"
                      optionValue="value"
                      :options="raceList"
                    />
                  </div>
                </div>
              </div>

              <div
                class="
                  flex flex-none
                  justify-content-center
                  align-items-center
                  ml-3
                "
              >
                <Button
                  @click="
                    deletePlayerFromList(
                      playerIndex,
                      matchResultForm.player_tuples
                    )
                  "
                  class="p-button-danger"
                  icon="pi pi-trash"
                />
              </div>
            </div>
            <div class="col-12">
              <Button
                @click="addNewPlayerTuple(matchResultForm.player_tuples)"
                class="w-full flex justify-content-center"
              >
                <i class="pi pi-plus"></i>
                <span>&nbsp;새 플레이어 추가</span>
              </Button>
            </div>
          </div>

          <!-- Miscellaneous -->
          <div
            class="col-12 p-3 flex justify-content-between align-items-center"
            id="miscellaneous"
          >
            <label id="form-label">비고</label>
            <InputText
              class="flex-grow-1 flex"
              type="text"
              v-model="matchResultForm.miscellaneous"
            />
            <Button
              class="flex-none flex p-button-danger ml-3"
              @click="deleteMatchResultFormFromList(matchResultFormIndex)"
            >
              <i class="pi pi-trash"></i>
              <span>&nbsp;전적 삭제</span>
            </Button>
          </div>
        </div>
      </StripePanel>
    </div>
    <!-- Controller -->
    <div class="flex justify-content-between">
      <Button @click="addNewMatchResultForm()">
        <i class="pi pi-plus"></i>
        <span>&nbsp;새 전적 추가</span>
      </Button>
      <Button class="p-button-success" @click="createMatch()">
        <i class="pi pi-save"></i>
        <span>&nbsp;저장</span>
      </Button>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import router from "@/router/index.js";
import Button from "primevue/button";
import SelectButton from "primevue/selectbutton";
import Calendar from "primevue/calendar";
import DropDown from "primevue/dropdown";
import InputText from "primevue/inputtext";

import ServerApi from "@/api/server/module.js";
import StripePanel from "@/components/StripePanel.vue";

export default defineComponent({
  components: {
    Button,
    Calendar,
    DropDown,
    InputText,
    SelectButton,
    StripePanel,
  },
  setup() {
    const clanData = ref(null);
    const matchResultFormList = ref([]);
    const raceList = [
      {
        race: "프로토스",
        value: "P",
      },
      {
        race: "테란",
        value: "T",
      },
      {
        race: "저그",
        value: "Z",
      },
    ];

    const addNewMatchResultForm = () => {
      matchResultFormList.value.push({
        league: "",
        title: "",
        date: new Date(),
        map: "",
        player_tuples: [],
        miscellaneous: "",
      });
    };

    const deleteMatchResultFormFromList = (indexOfTargetMatchResultForm) => {
      matchResultFormList.value.splice(indexOfTargetMatchResultForm, 1);
    };

    const addNewPlayerTuple = (player_tuples) => {
      player_tuples.push({
        winner: "",
        winner_race: "",
        loser: "",
        loser_race: "",
      });
    };

    const deletePlayerFromList = (indexOfTargetPlayer, player_tuples) => {
      player_tuples.splice(indexOfTargetPlayer, 1);
    };

    const createMatch = () => {
      transformDateToString();
      console.log(matchResultFormList.value);
      ServerApi.createMatch(matchResultFormList.value)
        .then(() => {
          router.push({ name: "HomeView" });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const transformDateToString = () => {
      matchResultFormList.value.forEach((form, index) => {
        matchResultFormList.value[index].date = form.date
          .toISOString()
          .substring(0, 10);
      });
    };

    onMounted(async () => {
      clanData.value = {};

      let response = await ServerApi.fetchLeagueList();
      clanData.value.leagueList = response.data;

      response = await ServerApi.fetchMapList();
      clanData.value.mapList = response.data;

      response = await ServerApi.fetchPlayerList();
      clanData.value.playerList = response.data;
    });
    return {
      clanData,
      matchResultFormList,
      raceList,
      addNewMatchResultForm,
      addNewPlayerTuple,
      createMatch,
      deleteMatchResultFormFromList,
      deletePlayerFromList,
    };
  },
});
</script>

<style>
#match-information {
  border-right: none;
  border-bottom: 1px dashed #dee2e6;
}
@media (min-width: 992px) {
  #match-information {
    border-right: 1px dashed #dee2e6;
    border-bottom: none;
  }
}
#form-header {
  font-weight: bold;
}
#form-label {
  min-width: 64px;
  margin-left: 1rem;
  margin-right: 1rem;
  flex: none;
  display: flex;
}
#miscellaneous {
  border-top: 1px solid #dee2e6;
}
</style>