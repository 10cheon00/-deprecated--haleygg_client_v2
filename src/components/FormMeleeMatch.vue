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
    <div class="col-12 form-player-tuples">
      <div class="grid grid-nogutter">
        <ValidationWrapper
          class="form-content"
          :errorObj="form.errorObj.player_tuples.$child[0].winner"
        >
          <label class="form-label">승자</label>
          <FormDataListInputField
            :form="form.state.player_tuples[0]"
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
          :errorObj="form.errorObj.player_tuples.$child[0].winner_race"
        >
          <label class="form-label">승자 종족</label>
          <SelectButton
            v-model="form.state.player_tuples[0].winner_race"
            class="w-full"
            :filter="true"
            optionLabel="race"
            optionValue="value"
            :options="resources.races"
          />
        </ValidationWrapper>
      </div>

      <div class="grid grid-nogutter">
        <ValidationWrapper
          class="form-content"
          :errorObj="form.errorObj.player_tuples.$child[0].loser"
        >
          <label class="form-label">패자</label>
          <FormDataListInputField
            :form="form.state.player_tuples[0]"
            field="loser"
            datalist="playerList"
          />
          <ValidationErrorMessage
            class="w-full my-2"
            :message="form.errorObj.player_tuples.$this.message"
          />
        </ValidationWrapper>
        <ValidationWrapper
          class="form-content"
          :errorObj="form.errorObj.player_tuples.$child[0].loser_race"
        >
          <label class="form-label">패자 종족</label>
          <SelectButton
            v-model="form.state.player_tuples[0].loser_race"
            class="w-full"
            :filter="true"
            optionLabel="race"
            optionValue="value"
            :options="resources.races"
          />
        </ValidationWrapper>
      </div>
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
import SelectButton from "primevue/selectbutton";

import FormDataListInputField from "@/components/FormDataListInputField.vue";
import FormDataList from "@/components/FormDataList.vue";
import ValidationErrorMessage from "@/components/ValidationErrorMessage.vue";
import ValidationWrapper from "@/components/ValidationWrapper.vue";

export default defineComponent({
  components: {
    InputMask,
    InputText,
    SelectButton,
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
    return {
      form,
    };
  },
});
</script>

<style scoped>
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