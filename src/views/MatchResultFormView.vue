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
            class="col-12 lg:col-6 grid grid-nogutter align-content-start p-3"
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
                optionValue="id"
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
                optionValue="id"
                :options="clanData.mapList"
              />
            </div>
          </div>

          <!-- Players -->
          <div class="col-12 lg:col-6 grid grid-nogutter align-content-start p-3">
            <div class="col-12 text-xl mb-3" id="form-header">플레이어 정보</div>
            <div
              v-for="(player, playerIndex) in matchResultForm.playerList"
              :key="playerIndex"
              class="col-12 flex my-2 align-items-center"
            >
              <label id="form-label">이름</label>
              <DropDown
                v-model="matchResultForm.playerList[playerIndex].id"
                class="flex-grow-1 flex mx-3"
                optionLabel="name"
                optionValue="id"
                :options="clanData.playerList"
              />
              <div class="flex-none flex align-items-center">
                <CheckBox
                  v-model="matchResultForm.playerList[playerIndex].isWin"
                  class="mx-1"
                  :binary="true"
                />
                <label>승리</label>
              </div>
              <Button
                @click="deletePlayerFromList(
                  playerIndex,
                  matchResultForm.playerList
                )"
                class="flex-none flex p-button-danger mx-1"
                icon="pi pi-trash"
              ></Button>
            </div>
            <div class="col-12">
              <Button
                @click="addPlayerToPlayerList(matchResultForm.playerList)"
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
      <Button class="p-button-success" @click="save()">
        <i class="pi pi-save"></i>
        <span>&nbsp;저장</span>
      </Button>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import CheckBox from 'primevue/checkbox';
import DropDown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';

import StripePanel from "@/components/StripePanel.vue";

export default defineComponent({
  components: {
    Button,
    Calendar,
    CheckBox,
    DropDown,
    InputText,
    StripePanel
  },
  setup() {
    const clanData = ref(null);
    const matchResultFormList = ref([]);

    const addNewMatchResultForm = () => {
      matchResultFormList.value.push({
        league: '',
        title: '',
        date: new Date(),
        map: '',
        playerList: [],
        miscellaneous: ''
      });
    };

    const deleteMatchResultFormFromList = (indexOfTargetMatchResultForm) => {
      matchResultFormList.value.splice(indexOfTargetMatchResultForm, 1)
    }

    const addPlayerToPlayerList = (playerList) => {
      playerList.push({
        id: '',
        isWin: false
      });
    };

    const deletePlayerFromList = (indexOfTargetPlayer, playerList) => {
      playerList.splice(indexOfTargetPlayer, 1);
    };

    onMounted(() => {
      clanData.value = {};
      clanData.value.leagueList = [
        { id: 0, name: 'HPL 1' },
        { id: 1, name: 'HSL 1' },
        { id: 2, name: '종족최강전' }
      ];
      clanData.value.mapList = [
        { id: 0, name: 'ㅌ투혼1' },
        { id: 1, name: 'H서킷' },
        { id: 2, name: 'ㅁㄴㅇㄻㄴㅇㄹㄴㅁㄹ' }
      ];
      clanData.value.playerList = [
        { id: 0, name: 'asdfadf' },
        { id: 1, name: '34134' },
        { id: 2, name: 'adfasdfasf' },
        { id: 3, name: 'z989f0' }
      ];
    });
    return {
      clanData,
      matchResultFormList,
      addNewMatchResultForm,
      addPlayerToPlayerList,
      deleteMatchResultFormFromList,
      deletePlayerFromList,
    }
  }
})
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