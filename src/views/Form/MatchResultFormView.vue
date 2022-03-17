<template>
  <div v-if="clanData">
    <PageHeader>
      <p class="text-4xl m-4 font-bold">전적 입력</p>
      <p class="text-300">
        개인전의 경우 승자와 패자를 각각 한 명씩만 추가해 입력하시고, 팀전의
        경우 인원수에 맞게 추가해 입력하시면 됩니다.
      </p>
      <p class="text-300">
        기권승, 패 등 기타 사항은 비고란에 입력하시면 됩니다.
      </p>
    </PageHeader>
    <Panel class="container p-3" header="New Match Result">
      <div class="grid grid-nogutter align-content-start">
        <!-- Game information -->
        <div class="col-12 p-3" id="match-information">
          <div class="w-full text-xl mb-3" id="form-header">게임 정보</div>

          <!-- League -->
          <div class="flex align-items-center my-2">
            <label id="form-label">리그</label>
            <DropDown
              v-model="matchResultForm.league"
              class="w-full"
              :filter="true"
              optionLabel="name"
              optionValue="name"
              :options="clanData.leagueList"
            />
          </div>
          <ValidationErrorMessage :obj="v$.state.league" />

          <!-- Title -->
          <div class="flex align-items-center my-2">
            <label id="form-label">게임 제목</label>
            <InputText
              v-model="matchResultForm.title"
              class="w-full"
              type="text"
            />
          </div>
          <ValidationErrorMessage :obj="v$.state.title" />

          <!-- Date -->
          <div class="flex align-items-center my-2">
            <label id="form-label">날짜</label>
            <Calendar
              v-model="matchResultForm.date"
              class="w-full"
              dateFormat="yy-mm-dd"
            />
          </div>
          <ValidationErrorMessage :obj="v$.state.date" />

          <!-- Map -->
          <div class="flex align-items-center my-2">
            <label id="form-label">맵</label>
            <DropDown
              v-model="matchResultForm.map"
              class="w-full"
              :filter="true"
              optionLabel="name"
              optionValue="name"
              :options="clanData.mapList"
            />
          </div>
          <ValidationErrorMessage :obj="v$.state.map" />
        </div>

        <!-- Player tuples -->
        <div class="col-12 p-3">
          <div class="w-full text-xl mb-3" id="form-header">플레이어 정보</div>
          <div
            v-for="(
              playerTuples, playerTupleIndex
            ) in matchResultForm.player_tuples"
            :key="playerTupleIndex"
            class="flex"
            :style="{
              'border-bottom':
                playerTupleIndex < matchResultForm.player_tuples.length - 1
                  ? '1px dashed #dee2e6'
                  : 'none',
            }"
          >
            <div class="flex-grow-1 grid-grid-nogutter">
              <div class="col-12 flex p-0 my-2">
                <!-- Winner -->
                <div class="flex-grow-1">
                  <div class="flex align-items-center">
                    <label id="form-label">승자</label>
                    <DropDown
                      v-model="playerTuples.winner"
                      class="w-full"
                      :filter="true"
                      optionLabel="name"
                      optionValue="name"
                      :options="clanData.playerList"
                    />
                  </div>
                  <ValidationErrorMessage
                    :obj="v$.state.player_tuples[playerTupleIndex].winner"
                  />
                </div>

                <!-- Winner's race -->
                <div class="flex-none ml-2">
                  <div class="flex align-items-center">
                    <label id="form-label">승자 종족</label>
                    <SelectButton
                      v-model="playerTuples.winner_race"
                      optionLabel="race"
                      optionValue="value"
                      :options="raceList"
                    />
                  </div>
                  <ValidationErrorMessage
                    :obj="v$.state.player_tuples[playerTupleIndex].winner_race"
                  />
                </div>
              </div>

              <div class="col-12 flex p-0 my-2">
                <!-- Loser -->
                <div class="flex-grow-1">
                  <div class="flex align-items-center">
                    <label id="form-label">패자</label>
                    <DropDown
                      v-model="playerTuples.loser"
                      class="w-full"
                      :filter="true"
                      optionLabel="name"
                      optionValue="name"
                      :options="clanData.playerList"
                    />
                  </div>
                  <ValidationErrorMessage
                    :obj="v$.state.player_tuples[playerTupleIndex].loser"
                  />
                </div>

                <!-- Loser's race -->
                <div class="flex-none ml-2">
                  <div class="flex align-items-center">
                    <label id="form-label">패자 종족</label>
                    <SelectButton
                      v-model="playerTuples.loser_race"
                      optionLabel="race"
                      optionValue="value"
                      :options="raceList"
                    />
                  </div>
                  <ValidationErrorMessage
                    :obj="v$.state.player_tuples[playerTupleIndex].loser_race"
                  />
                </div>
              </div>
            </div>

            <!-- Delete player tuple -->
            <div
              class="
                flex flex-none
                justify-content-center
                align-items-center
                mx-3
              "
            >
              <Button
                @click="
                  deletePlayerTuple(
                    playerTupleIndex,
                    matchResultForm.player_tuples
                  )
                "
                class="p-button-danger"
                icon="pi pi-trash"
              />
            </div>
          </div>

          <!-- Extra error message -->
          <ValidationErrorMessage :obj="v$.state.extra" />

          <!-- Add new player tuple -->
          <div class="w-full">
            <Button
              @click="addPlayerTuple(matchResultForm.player_tuples)"
              class="flex justify-content-center w-full mt-2"
            >
              <i class="pi pi-plus"></i>
              <span>&nbsp;새 플레이어 추가</span>
            </Button>
          </div>
          <!-- Error messages from server -->

          <div v-if="errorMessagesFromServer.length > 0">
            <div
              v-for="errorMessage in errorMessagesFromServer"
              :key="errorMessage"
            >
              <ValidationErrorMessage class="pt-2" :obj="errorMessage" />
            </div>
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
          <!-- Controller -->
          <div class="flex justify-content-end ml-3">
            <Button class="p-button-success" @click="createMatch()">
              <i class="pi pi-save"></i>
              <span>&nbsp;저장</span>
            </Button>
          </div>
        </div>
      </div>
    </Panel>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, reactive } from "vue";
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import DropDown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import SelectButton from "primevue/selectbutton";
import router from "@/router/index.js";

import ServerApi from "@/api/server/module.js";
import PageHeader from "@/components/PageHeader.vue";
import Panel from "@/components/Panel.vue";
import ValidationErrorMessage from "@/components/ValidationErrorMessage.vue";
import { useValidator } from "@/utils/validator.js";

export default defineComponent({
  components: {
    Button,
    Calendar,
    DropDown,
    InputText,
    SelectButton,
    PageHeader,
    Panel,
    ValidationErrorMessage,
  },
  setup() {
    const clanData = ref(null);
    const errorMessagesFromServer = reactive([]);
    const matchResultForm = reactive({
      league: "",
      date: new Date(),
      title: "",
      map: "",
      miscellaneous: "",
      player_tuples: [],
    });

    const rules = {
      league: { required: true },
      date: { required: true },
      title: { required: true },
      map: { required: true },
      miscellaneous: { required: false },
      player_tuples: {
        winner: { required: true },
        winner_race: { required: true },
        loser: { required: true },
        loser_race: { required: true },
      },
    };

    const extraValidations = {
      player_tuples: (objs) => {
        const errorObj = {
          isError: false,
          errorMessage: "",
        };
        const players = objs.reduce((acc, cur) => {
          if (cur.winner != "") {
            acc.push(cur.winner);
          }
          if (cur.loser != "") {
            acc.push(cur.loser);
          }
          return acc;
        }, new Array());
        const duplicatedPlayers = players.filter((player, index) => {
          return players.indexOf(player) !== index;
        });
        if (duplicatedPlayers.length > 0) {
          errorObj.isError = true;
          errorObj.errorMessage = `중복된 플레이어가 존재합니다. "${duplicatedPlayers.toString()}"`;
        }
        return errorObj;
      },
    };

    const v$ = useValidator(matchResultForm, rules, extraValidations);

    const raceList = [
      {
        race: "P",
        value: "P",
      },
      {
        race: "T",
        value: "T",
      },
      {
        race: "Z",
        value: "Z",
      },
    ];

    const addPlayerTuple = (player_tuples) => {
      player_tuples.push({
        winner: "",
        winner_race: "",
        loser: "",
        loser_race: "",
      });
    };

    const deletePlayerTuple = (indexOfTargetPlayer, player_tuples) => {
      player_tuples.splice(indexOfTargetPlayer, 1);
    };

    const createMatch = () => {
      if (v$.isErrorExists() == false) {
        transformDateToString();
        ServerApi.createMatch(matchResultForm)
          .then((response) => {
            console.log(response);
            router.push({ name: "HomeView" });
          })
          .catch((error) => {
            if (error.response.status == 400) {
              errorMessagesFromServer.splice(0, errorMessagesFromServer.length);
              parseErrorMessageFromServer(error.response.data);
            } else {
              router.push({ name: "RequestErrorView" });
            }
          });
      }
    };

    const transformDateToString = () => {
      if (!(matchResultForm.date instanceof Date)) {
        matchResultForm.date = new Date(matchResultForm.date);
      }
      matchResultForm.date = matchResultForm.date
        .toISOString()
        .substring(0, 10);
    };

    const parseErrorMessageFromServer = (data) => {
      Object.keys(data).forEach((key) => {
        if (data[key] instanceof Object) {
          parseErrorMessageFromServer(data[key]);
        } else if (Array.isArray(data[key])) {
          data[key].forEach((item) => {
            parseErrorMessageFromServer(item);
          });
        } else {
          errorMessagesFromServer.push({
            isError: true,
            isTouched: true,
            errorMessage: data[key],
          });
        }
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
      errorMessagesFromServer,
      matchResultForm,
      raceList,
      v$,
      addPlayerTuple,
      createMatch,
      deletePlayerTuple,
    };
  },
});
</script>

<style>
#match-information {
  border-right: none;
  border-bottom: 1px dashed #dee2e6;
}
#form-header {
  font-weight: bold;
}
#form-label {
  min-width: 6rem;
  margin-left: 1rem;
  margin-right: 1rem;
  flex: none;
  display: flex;
}
#miscellaneous {
  border-top: 1px solid #dee2e6;
}
</style>