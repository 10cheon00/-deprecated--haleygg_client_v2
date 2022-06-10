<template>
  <div v-if="form" class="grid grid-nogutter">
    <!-- League -->
    <ValidationWrapper class="form-content" :errorObj="form.errorObj.league">
      <label class="form-label">리그</label>
      <FormDataListInputField
        :form="form.state"
        field="league"
        datalist="leagueList"
      />
    </ValidationWrapper>

    <!-- Title -->
    <ValidationWrapper class="form-content" :errorObj="form.errorObj.title">
      <label class="form-label">게임 제목</label>
      <InputText v-model="form.state.title" class="w-full" type="text" />
    </ValidationWrapper>

    <!-- Date -->
    <ValidationWrapper class="form-content" :errorObj="form.errorObj.date">
      <label class="form-label">날짜</label>
      <InputMask
        v-model="form.state.date"
        class="w-full"
        mask="9999-99-99"
        slotChar="yyyy/mm/dd"
      />
    </ValidationWrapper>

    <!-- Map -->
    <ValidationWrapper class="form-content" :errorObj="form.errorObj.map">
      <label class="form-label">맵</label>
      <FormDataListInputField
        :form="form.state"
        field="map"
        datalist="mapList"
      />
    </ValidationWrapper>

    <!-- Player tuples -->
    <div
      v-for="(playerTuple, index) in form.state.player_tuples"
      :key="index"
      class="col-12 grid grid-nogutter form-player-tuples"
    >
      <ValidationWrapper
        class="form-content"
        :errorObj="form.errorObj.player_tuples.$child[index].winner"
      >
        <label class="form-label">승자</label>
        <FormDataListInputField
          :form="playerTuple"
          field="winner"
          datalist="playerList"
        />
        <ValidationErrorMessage
          class="w-full my-2"
          :message="form.errorObj.player_tuples.$this.message"
        />
      </ValidationWrapper>
      <ValidationWrapper
        class="form-content"
        :errorObj="form.errorObj.player_tuples.$child[index].loser"
      >
        <label class="form-label">패자</label>
        <FormDataListInputField
          :form="playerTuple"
          field="loser"
          datalist="playerList"
        />
        <ValidationErrorMessage
          class="w-full my-2"
          :message="form.errorObj.player_tuples.$this.message"
        />
      </ValidationWrapper>
    </div>

    <!-- Miscellaneous -->
    <div class="col-12 p-2" id="miscellaneous">
      <label class="form-label">비고</label>
      <InputText
        class="w-full"
        type="text"
        v-model="form.state.miscellaneous"
      />
    </div>
    <FormDataList :datalist="resources.players" datalistId="playerList" />
    <FormDataList :datalist="resources.maps" datalistId="mapList" />
    <FormDataList :datalist="resources.leagues" datalistId="leagueList" />
  </div>
</template>
<script>
import { defineComponent, toRef } from "vue";
import InputMask from "primevue/inputmask";
import InputText from "primevue/inputtext";

import FormDataListInputField from "@/components/FormDataListInputField.vue";
import FormDataList from "@/components/FormDataList.vue";
import ValidationWrapper from "@/components/ValidationWrapper.vue";
import ValidationErrorMessage from "@/components/ValidationErrorMessage.vue";

export default defineComponent({
  components: {
    InputMask,
    InputText,
    FormDataListInputField,
    FormDataList,
    ValidationErrorMessage,
    ValidationWrapper,
  },
  props: {
    resources: {
      type: Object,
      required: true,
    },
    wrappedForm: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const form = toRef(props, "wrappedForm");

    const log = () => {
      console.log(form.value.state.player_tuples);
    };

    return {
      form,
      log,
    };
  },
});
</script>

<style scoped>
input::-webkit-calendar-picker-indicator {
  display: none;
}

.form-label {
  color: gray;
  font-size: smaller;
  font-weight: bold;
  margin-left: 0.5rem;
}

.form-content {
  padding: 0.5rem;
  width: 50%;
}

@media (max-width: 768px) {
  .form-content {
    width: 100%;
  }
}

.form-player-tuples {
  border-top: 1px dashed #dee2e6;
}

#miscellaneous {
  border-top: 1px dashed #dee2e6;
}
</style>