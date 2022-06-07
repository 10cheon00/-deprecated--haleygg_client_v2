<template>
  <div v-if="form" class="grid grid-nogutter">
    <!-- League -->
    <ValidationWrapper class="form-content" :errorObj="form.errorObj.league">
      <label class="form-label">리그</label>
      <DropDown
        v-model="form.state.league"
        class="w-full"
        :filter="true"
        optionLabel="name"
        optionValue="name"
        :options="resources.leagues"
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
      <DropDown
        v-model="form.state.map"
        class="w-full"
        :filter="true"
        optionLabel="name"
        optionValue="name"
        :options="resources.maps"
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
          <input
            class="form-suggestion-input w-full"
            type="text"
            list="playerList"
            v-model="form.state.player_tuples[0].winner"
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
          <input
            class="form-suggestion-input w-full"
            type="text"
            list="playerList"
            v-model="form.state.player_tuples[0].loser"
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

    <datalist id="playerList">
      <option
        v-for="player in resources.players"
        :key="player"
        :value="player.name"
      >
        {{ player.name }}
      </option>
    </datalist>
  </div>
</template>
<script>
import { defineComponent, toRef } from "vue";
import DropDown from "primevue/dropdown";
import InputMask from "primevue/inputmask";
import InputText from "primevue/inputtext";
import SelectButton from "primevue/selectbutton";

import ValidationErrorMessage from "@/components/ValidationErrorMessage.vue";
import ValidationWrapper from "@/components/ValidationWrapper.vue";

export default defineComponent({
  components: {
    DropDown,
    InputMask,
    InputText,
    SelectButton,
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

.form-suggestion-input {
  padding: 0.429rem;
  font-size: 1rem;
  display: inline-block;
  border: 1px solid #a6a6a6;
  border-radius: 3px;
}

#miscellaneous {
  border-top: 1px dashed #dee2e6;
}
</style>