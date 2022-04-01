<template>
  <div v-if="resources">
    <PageHeader class="p-6">
      <p class="text-4xl m-4 font-bold">전적 입력</p>
      <p class="text-300">
        게임 타입에 맞게 전적을 추가해 입력한 후, 저장 버튼을 누르시면 한 번에
        저장됩니다.
      </p>
      <p class="text-300">기권승 등 기타 사항은 비고란에 입력하시면 됩니다.</p>
    </PageHeader>

    <div class="container p-3">
      <div v-for="(item, index) in matchResultForms" :key="index">
        <Panel class="form" header="새 전적 입력">
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
          >
          </component>
        </Panel>
      </div>
      <!-- Controller -->
      <div class="flex mb-2">
        <Button
          class="p-button-info button mr-1"
          @click="addMeleeMatchResult()"
        >
          <i class="pi pi-plus" />
          <span>&nbsp;개인 전적 추가</span>
        </Button>
        <Button
          class="p-button-help button ml-1"
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

import ServerApi from "@/api/server/module.js";
import PageHeader from "@/components/PageHeader.vue";
import Panel from "@/components/Panel.vue";
import {
  initializeErrorObj,
  isErrorExists,
  validate,
  Required,
} from "@/utils/validator.js";

export default defineComponent({
  components: {
    Button,
    PageHeader,
    Panel,
  },
  setup() {
    const resources = ref(null);
    const errorMessagesFromServer = reactive([]);
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
          league: Required,
          title: Required,
          date: Required,
          map: Required,
          player_tuples: {
            $this: Required,
            $child: {
              winner: Required,
              winner_race: Required,
              loser: Required,
              loser_race: Required,
            },
          },
        };
        matchResultForms.push({
          component: component,
          state: state,
          rules: rules,
          errorObj: initializeErrorObj(state, rules),
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
          league: Required,
          title: Required,
          date: Required,
          map: Required,
          player_tuples: {
            $this: Required,
            $child: {
              winner: Required,
              winner_race: Required,
              loser: Required,
              loser_race: Required,
            },
          },
        };
        matchResultForms.push({
          component: component,
          state: state,
          rules: rules,
          errorObj: initializeErrorObj(state, rules),
        });
      });
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

      ServerApi.createMatch(forms)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response);
        });
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
      errorMessagesFromServer,
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
.form {
  margin-bottom: 0.5rem;
}

.controller-button {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>