<template>
  <div v-if="resources">
    <BasePageHeader>
      <p class="text-4xl m-4 font-bold">전적 입력</p>
      <p class="text-300">
        게임 타입에 맞게 전적을 추가해 입력한 후, 저장 버튼을 누르시면 한 번에
        저장됩니다.
      </p>
      <p class="text-300">기권승 등 기타 사항은 비고란에 입력하시면 됩니다.</p>
    </BasePageHeader>

    <div class="container p-3">
      <div v-for="(item, index) in matchResultForms" :key="index">
        <BasePanel class="form" header="새 전적 입력">
          <template #panel-header-right>
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-sm p-button-danger"
              @click="deleteMatchResult(index)"
            />
          </template>

          <component
            :is="item.component"
            :resources="resources"
            :wrappedForm="item"
          />
          <div
            v-if="item.errorMessagesFromServer.length"
            class="form-error-from-server"
          >
            <ValidationErrorMessage
              v-for="message in item.errorMessagesFromServer"
              :key="message"
              :message="message"
              class="m-2"
            />
          </div>
        </BasePanel>
      </div>
      <!-- Controller -->
      <div class="flex mb-2">
        <Button
          class="p-button-info controller-button mr-1"
          @click="addMeleeMatchResult()"
        >
          <i class="pi pi-plus" />
          <span>&nbsp;개인 전적 추가</span>
        </Button>
        <Button
          class="p-button-help controller-button ml-1"
          @click="addTopAndBottomMatchResult()"
        >
          <i class="pi pi-plus" />
          <span>&nbsp;팀플 전적 추가</span>
        </Button>
      </div>
      <div class="flex">
        <Button class="p-button-success controller-button" @click="postMatch()">
          <i class="pi pi-save" />
          <span>&nbsp;저장</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, reactive, shallowRef } from "vue";
import Button from "primevue/button";

import BasePageHeader from "@/components/BasePageHeader.vue";
import BasePanel from "@/components/BasePanel.vue";
import ServerApi from "@/api/server/module.js";
import ValidationErrorMessage from "@/components/ValidationErrorMessage.vue";
import {
  initializeErrorObj,
  isErrorExists,
  validate,
  Required,
} from "@/utils/validator.js";

export default defineComponent({
  components: {
    BasePageHeader,
    BasePanel,
    Button,
    ValidationErrorMessage,
  },
  setup() {
    const resources = ref(null);
    const matchResultForms = reactive([]);

    const addMeleeMatchResult = () => {
      const component = shallowRef("");
      import("@/components/FormMeleeMatch.vue").then((val) => {
        component.value = val.default;
        const state = {
          league: "",
          date: new Date().toISOString().slice(0, 10),
          title: "",
          map: "",
          miscellaneous: "",
          player_tuples: [
            {
              winner: "",
              winner_race: "",
              loser: "",
              loser_race: "",
            },
          ],
        };
        const rules = {
          league: { Required },
          title: { Required },
          date: { DateFormat, Required },
          map: { Required },
          player_tuples: {
            $this: { NoDuplicates, Required },
            $child: {
              winner: { Required },
              winner_race: { Required },
              loser: { Required },
              loser_race: { Required },
            },
          },
        };
        matchResultForms.push({
          component: component,
          state: state,
          rules: rules,
          errorObj: initializeErrorObj(state),
          errorMessagesFromServer: [],
        });
      });
    };

    const addTopAndBottomMatchResult = () => {
      const component = shallowRef("");
      import("@/components/FormTopAndBottomMatch.vue").then((val) => {
        component.value = val.default;
        const state = {
          league: "",
          date: new Date().toISOString().slice(0, 10),
          title: "",
          map: "",
          miscellaneous: "",
          player_tuples: [
            {
              winner: "",
              loser: "",
            },
            {
              winner: "",
              loser: "",
            },
            {
              winner: "",
              loser: "",
            },
          ],
        };
        const rules = {
          league: { Required },
          title: { Required },
          date: { DateFormat, Required },
          map: { Required },
          player_tuples: {
            $this: { NoDuplicates, Required },
            $child: {
              winner: { Required },
              loser: { Required },
            },
          },
        };
        matchResultForms.push({
          component: component,
          state: state,
          rules: rules,
          errorObj: initializeErrorObj(state, rules),
          errorMessagesFromServer: [],
        });
      });
    };

    const DateFormat = (state) => {
      if (isNaN(Date.parse(state))) {
        return "잘못된 날짜입니다.";
      }
      return false;
    };

    const NoDuplicates = (state) => {
      const aggregation = state.reduce((a, e) => {
        if (e.winner != "") {
          a[e.winner] = (a[e.winner] || 0) + 1;
        }
        if (e.loser != "") {
          a[e.loser] = (a[e.loser] || 0) + 1;
        }
        return a;
      }, new Object());
      const duplicates = Object.keys(aggregation).filter(
        (key) => aggregation[key] > 1
      );
      console.log(duplicates);
      if (duplicates.length > 0) {
        return `${duplicates}이(가) 중복되었습니다.`;
      }
      return false;
    };

    const deleteMatchResult = (index) => {
      matchResultForms.splice(index, 1);
    };

    const postMatch = () => {
      const isFormHasError = matchResultForms.reduce((result, form) => {
        validate(form);
        result = isErrorExists(form) || result;
        return result;
      }, false);

      if (isFormHasError) {
        return;
      }
      const forms = matchResultForms.reduce((acc, cur) => {
        acc.push(cur.state);
        return acc;
      }, new Array());

      if (forms.length > 0) {
        ServerApi.createMatch(forms)
          .then((res) => {
            console.log(forms, res);
            //alert result.
          })
          .catch((error) => {
            error.response.data.forEach((data, index) => {
              matchResultForms[index].errorMessagesFromServer =
                parseResponseToErrorMessage(data);
            });
          });
      }
    };

    const parseResponseToErrorMessage = (response) => {
      let result = [];
      if (typeof response == "object") {
        Object.keys(response).forEach((key) => {
          result = result.concat(parseResponseToErrorMessage(response[key]));
        });
      } else if (Array.isArray(response)) {
        response.forEach((data) => {
          result = result.concat(parseResponseToErrorMessage(data));
        });
      } else {
        result = result.concat([response]);
      }
      return result;
    };

    onMounted(async () => {
      resources.value = {};

      let response = await ServerApi.fetchLeagueList();
      resources.value.leagues = response.data;

      response = await ServerApi.fetchMapList();
      resources.value.maps = response.data;

      response = await ServerApi.fetchPlayerList();
      resources.value.players = response.data;

      resources.value.races = [
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
    });

    return {
      matchResultForms,
      resources,

      addMeleeMatchResult,
      addTopAndBottomMatchResult,
      deleteMatchResult,
      postMatch,
    };
  },
});
</script>

<style>
.controller-button {
  width: 100%;
  display: flex;
  justify-content: center;
}

.form {
  margin-bottom: 0.5rem;
}

.form-error-from-server {
  border-top: 1px dashed #dee2e6;
}
</style>